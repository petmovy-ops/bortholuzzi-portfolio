# Importação local dos arquivos de mídia

Este procedimento evita baixar o pacote de 467 MB gerado no ambiente de trabalho. Ele usa os três ZIPs originais diretamente no Mac do usuário e extrai as imagens para `public/media/`, preservando os nomes originais.

## Requisitos

- macOS com Python 3 instalado
- Repositório clonado localmente na branch `phase-3-foundation`
- ZIPs originais: `Archive.zip`, `Archive 2.zip` e `bortholuzzi_missing_assets.zip`

## Execução

Na raiz do repositório:

```bash
mkdir -p source-archives
```

Coloque os três ZIPs originais dentro de `source-archives/` e execute:

```bash
chmod +x scripts/import-media-archives.sh
./scripts/import-media-archives.sh
```

Também é possível passar os caminhos completos dos ZIPs como argumentos:

```bash
./scripts/import-media-archives.sh "/caminho/Archive.zip" "/caminho/Archive 2.zip" "/caminho/bortholuzzi_missing_assets.zip"
```

O script extrai apenas imagens, não sobrescreve arquivos com conteúdo diferente e interrompe a execução se detectar colisões de nomes. Ele gera `media-file-index.json` e `media-file-index.csv` com tamanho e SHA-256 de cada arquivo.

## Depois da importação

Revise a contagem e o manifesto antes de adicionar os arquivos ao Git. Não faça merge em `main`, não publique em produção e não altere DNS nesta etapa.

```bash
git status --short
find public/media -type f | wc -l
git add public/media media-file-index.json media-file-index.csv
git commit -m "Add original portfolio media assets"
git push origin phase-3-foundation
```

A publicação no Cloudflare Pages é uma etapa separada e exige autenticação configurada localmente. Não cole tokens ou chaves no chat.
