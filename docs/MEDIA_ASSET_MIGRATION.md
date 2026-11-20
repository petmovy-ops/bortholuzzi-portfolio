# Media asset migration — verified inventory

## Source-of-truth audit

The recovered `MEDIA_MAPPING_ASSETS.csv` contains 849 image records.

| Metric | Verified value |
|---|---:|
| Total image records | 849 |
| Records with explicit project association | 721 |
| Records without direct project association | 128 |
| Project slugs with direct image associations | 41 |
| Records marked present in source archives | 849 |
| Records marked absent from source archives | 0 |

The 721 associations are explicit references in the recovered media inventory. The 128 unassociated records must remain available for review and must not be assigned to projects by visual or filename inference.

## Source archives

- `Archive.zip`: 444 image assets
- `Archive 2.zip`: 269 image assets
- `bortholuzzi_missing_assets.zip`: 136 image assets

Total: 849 assets. The missing-assets ZIP also contains recovery notes and CSV files; only the 136 image records listed by the audited manifest count toward the image total.

## Hosting decision

Do not add the original image binaries to this Git repository or to the static Pages build. The recovered image archives total hundreds of megabytes; putting them in Git history would make normal source control and deployments unnecessarily heavy.

Recommended target: Cloudflare R2 for original image binaries, with a public/custom media hostname (for example, a dedicated media subdomain) and immutable object keys. The static Next.js site should consume a generated manifest that preserves the exact project associations and source filenames.

## Migration sequence

1. Create an R2 bucket and configure a public/custom media hostname.
2. Upload all 849 original files without recompression or renaming.
3. Verify uploaded object count and byte sizes against the manifest.
4. Generate the production media manifest using the new media hostname.
5. Keep the 128 unassociated assets in a separate review index.
6. Switch gallery URLs only after object-level verification and a preview deployment.

## Current implementation status

- The site currently has an initial, partial media mapping in `src/data/media.json`. It is not the complete 849-record inventory and must not be treated as final.
- Some gallery URLs still reference the original Adobe Portfolio CDN.
- The source archives have been audited locally and all 849 manifest records are present in their declared source archives.
- No R2 bucket is connected or configured from this environment.
- No original binaries have been uploaded to R2.
- No DNS, production deployment, or `main` branch changes were made.

## Integrity rules

- Preserve originals.
- Do not rename files unless an explicit mapping preserves the original filename.
- Do not infer project relationships.
- Do not discard the unassociated 128 assets.
- Do not switch production URLs before preview verification.
