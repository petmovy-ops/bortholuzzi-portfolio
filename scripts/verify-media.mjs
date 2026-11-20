import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const mediaRoot = path.join(root, "public", "media");
const projects = JSON.parse(await readFile(path.join(root, "src/data/projects.json"), "utf8"));
const media = JSON.parse(await readFile(path.join(root, "src/data/media.json"), "utf8"));

const files = (await readdir(mediaRoot, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .sort();
const fileSet = new Set(files);
const mappedEntries = Object.entries(media);
const mappedAssets = mappedEntries.flatMap(([slug, assets]) =>
  assets.map((asset) => ({ slug, ...asset }))
);
const mappedNames = mappedAssets.map((asset) => asset.file);
const projectSlugs = new Set(projects.map((project) => project.slug));
const errors = [];

if (files.length !== 849) errors.push(`Expected 849 preserved media files, found ${files.length}`);
if (mappedEntries.length !== 41) errors.push(`Expected 41 mapped pages, found ${mappedEntries.length}`);
if (mappedAssets.length !== 721) errors.push(`Expected 721 mapped assets, found ${mappedAssets.length}`);
if (new Set(mappedNames).size !== mappedNames.length) errors.push("Duplicate filenames found in media mapping");

for (const [slug, assets] of mappedEntries) {
  if (!projectSlugs.has(slug)) errors.push(`Media mapping references unknown project slug: ${slug}`);
  for (const asset of assets) {
    if (!asset.file || asset.src !== `/media/${asset.file}`) {
      errors.push(`Invalid local media path for ${slug}: ${asset.file}`);
    }
    if (!fileSet.has(asset.file)) errors.push(`Missing source asset: ${asset.file}`);
  }
}

const unassociated = files.filter((file) => !mappedNames.includes(file));
if (unassociated.length !== 128) {
  errors.push(`Expected 128 unassociated files to remain preserved, found ${unassociated.length}`);
}

const outputFlag = process.argv.indexOf("--output");
if (outputFlag !== -1) {
  const outputRoot = path.resolve(root, process.argv[outputFlag + 1] || "out");
  const outputMedia = path.join(outputRoot, "media");
  try {
    const outputFiles = (await readdir(outputMedia, { withFileTypes: true }))
      .filter((entry) => entry.isFile()).map((entry) => entry.name);
    if (outputFiles.length !== files.length) {
      errors.push(`Static output contains ${outputFiles.length} media files; expected ${files.length}`);
    }
    for (const file of mappedNames) {
      try { await stat(path.join(outputMedia, file)); }
      catch { errors.push(`Mapped asset missing from static output: ${file}`); }
    }
  } catch {
    errors.push(`Static media directory not found: ${outputMedia}`);
  }
}

if (errors.length) {
  console.error("Media integrity validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Media integrity validation passed.");
console.log(`- ${files.length} preserved files in public/media/`);
console.log(`- ${mappedAssets.length} mapped assets across ${mappedEntries.length} pages`);
console.log(`- ${unassociated.length} unassociated files preserved without inferred links`);
if (outputFlag !== -1) console.log("- All media files are present in the static export.");
