#!/usr/bin/env bash
set -euo pipefail

# Importa os arquivos de mídia dos ZIPs originais para public/media.
# Uso:
#   ./scripts/import-media-archives.sh /caminho/Archive.zip "/caminho/Archive 2.zip" /caminho/bortholuzzi_missing_assets.zip
# Ou coloque os três ZIPs em ./source-archives/ e execute sem argumentos.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [ "$#" -gt 0 ]; then
  ARCHIVES=("$@")
else
  ARCHIVES=(
    "$ROOT/source-archives/Archive.zip"
    "$ROOT/source-archives/Archive 2.zip"
    "$ROOT/source-archives/bortholuzzi_missing_assets.zip"
  )
fi

for archive in "${ARCHIVES[@]}"; do
  if [ ! -f "$archive" ]; then
    echo "ERRO: arquivo não encontrado: $archive" >&2
    exit 1
  fi
done

python3 - "${ARCHIVES[@]}" <<'PY'
import hashlib
import json
import sys
import zipfile
from pathlib import Path, PurePosixPath

root = Path.cwd()
destination = root / "public" / "media"
destination.mkdir(parents=True, exist_ok=True)
allowed = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
records = []
seen = {}
conflicts = []

for archive_name in sys.argv[1:]:
    archive = Path(archive_name)
    with zipfile.ZipFile(archive) as zf:
        for info in zf.infolist():
            if info.is_dir():
                continue
            raw = info.filename.replace("\\", "/")
            path = PurePosixPath(raw)
            if path.is_absolute() or ".." in path.parts:
                raise SystemExit(f"Entrada ZIP insegura: {archive.name}:{info.filename}")
            if path.suffix.lower() not in allowed:
                continue

            # Mantém o nome original. Se houver colisão entre ZIPs, interrompe
            # em vez de sobrescrever ou renomear silenciosamente.
            filename = path.name
            if filename in seen:
                conflicts.append((filename, seen[filename], archive.name))
                continue

            payload = zf.read(info)
            target = destination / filename
            if target.exists():
                existing_hash = hashlib.sha256(target.read_bytes()).hexdigest()
                incoming_hash = hashlib.sha256(payload).hexdigest()
                if existing_hash != incoming_hash:
                    conflicts.append((filename, "já existe em public/media", archive.name))
                    continue
                digest = existing_hash
            else:
                target.write_bytes(payload)
                digest = hashlib.sha256(payload).hexdigest()

            seen[filename] = archive.name
            records.append({
                "filename": filename,
                "path": f"/media/{filename}",
                "source_archive": archive.name,
                "bytes": len(payload),
                "sha256": digest,
            })

if conflicts:
    print("Colisões detectadas; nenhum arquivo foi sobrescrito:", file=sys.stderr)
    for item in conflicts:
        print(" - " + " | ".join(item), file=sys.stderr)
    raise SystemExit(2)

records.sort(key=lambda item: item["filename"].lower())
manifest_json = root / "media-file-index.json"
manifest_csv = root / "media-file-index.csv"
manifest_json.write_text(json.dumps(records, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

import csv
with manifest_csv.open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["filename", "path", "source_archive", "bytes", "sha256"])
    writer.writeheader()
    writer.writerows(records)

print(f"Importação concluída: {len(records)} arquivos.")
print(f"Destino: {destination}")
print(f"Manifestos: {manifest_json.name}, {manifest_csv.name}")
PY
