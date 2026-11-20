import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const mediaRoot = path.join(root, "public", "media");
const projects = JSON.parse(await readFile(path.join(root, "src/data/projects.json"), "utf8"));
const media = JSON.parse(await readFile(path.join(root, "src/data/media.json"), "utf8"));

function getAssetIdentity(file) {
  // Stable UUID + rendition recipe identify a source image; final numeric segment is generated width.
  const match = file.match(/^[^-]+-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})_(rw|carw|rwc)_(.+)\.([^.]+)$/i);
  if (!match) return null;
  const [, uuid, kind, tail] = match;
  const parts = tail.split("x");
  const width = Number(parts.pop()) || 0;
  return { key: uuid.toLowerCase() + "|" + kind.toLowerCase() + "_" + parts.join("x"), width };
}

const files = (await readdir(mediaRoot, { withFileTypes: true })).filter((entry) => entry.isFile()).map((entry) => entry.name).sort();
const fileSet = new Set(files);
const mappedEntries = Object.entries(media);
const mappedAssets = mappedEntries.flatMap(([slug, assets]) => assets.map((asset) => ({ slug, ...asset })));
const mappedNames = mappedAssets.map((asset) => asset.file);
const projectSlugs = new Set(projects.map((project) => project.slug));
const errors = [];

if (files.length !== 849) errors.push("Expected 849 preserved media files, found " + files.length);
if (mappedEntries.length !== 41) errors.push("Expected 41 mapped pages, found " + mappedEntries.length);
if (new Set(mappedNames).size !== mappedNames.length) errors.push("Duplicate filenames found in media mapping");

for (const [slug, assets] of mappedEntries) {
  if (!projectSlugs.has(slug)) errors.push("Media mapping references unknown project slug: " + slug);
  const identities = new Set();
  for (const asset of assets) {
    if (!asset.file || asset.src !== "/media/" + asset.file) errors.push("Invalid local media path for " + slug + ": " + asset.file);
    if (!fileSet.has(asset.file)) errors.push("Missing source asset: " + asset.file);
    const identity = getAssetIdentity(asset.file);
    if (!identity) errors.push("Unrecognized Adobe Portfolio asset filename: " + asset.file);
    else if (identities.has(identity.key)) errors.push("Duplicate rendition of the same source image in " + slug + ": " + asset.file);
    else identities.add(identity.key);
  }
}

const outputFlag = process.argv.indexOf("--output");
if (outputFlag !== -1) {
  const outputRoot = path.resolve(root, process.argv[outputFlag + 1] || "out");
  const outputMedia = path.join(outputRoot, "media");
  try {
    const outputFiles = (await readdir(outputMedia, { withFileTypes: true })).filter((entry) => entry.isFile()).map((entry) => entry.name);
    if (outputFiles.length !== files.length) errors.push("Static output contains " + outputFiles.length + " media files; expected " + files.length);
    for (const file of mappedNames) { try { await stat(path.join(outputMedia, file)); } catch { errors.push("Mapped asset missing from static output: " + file); } }
  } catch { errors.push("Static media directory not found: " + outputMedia); }
}

if (errors.length) { console.error("Media integrity validation failed:"); for (const error of errors) console.error("- " + error); process.exit(1); }
console.log("Media integrity validation passed.");
console.log("- " + files.length + " original files preserved in public/media/");
console.log("- " + mappedAssets.length + " distinct source images mapped across " + mappedEntries.length + " pages");
console.log("- Lower-resolution renditions remain preserved but are not repeated in galleries");
if (outputFlag !== -1) console.log("- All media files are present in the static export.");
