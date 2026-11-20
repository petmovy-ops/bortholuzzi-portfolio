# Zero-cost media hosting audit

Date: 2026-11-20

## Decision constraint

The portfolio rebuild must not require a payment card, paid Cloudflare subscription, R2 bucket, or other recurring storage service.

## Source archive measurements

The three audited image archives were inspected directly.

| Source archive | Image files | Uncompressed image bytes | Largest image |
|---|---:|---:|---:|
| Archive.zip | 444 | 253,916,626 | 7,278,954 |
| Archive 2.zip | 269 | 162,006,980 | 8,200,257 |
| bortholuzzi_missing_assets.zip | 136 | 72,470,899 | 5,385,420 |
| **Total** | **849** | **488,394,505** | **8,200,257** |

Total uncompressed image payload: approximately 465.8 MiB. All 849 images are below Cloudflare Pages' 25 MiB per-file limit. The media count is far below the Cloudflare Pages Free limit of 20,000 files per site.

## Zero-cost deployment architecture

- Cloudflare Pages Free hosts the static Next.js export and its image files.
- No R2 bucket, R2 subscription, payment method, or public bucket is required.
- Images are deployed as ordinary static assets and referenced by their preserved relative paths.
- The 128 assets without direct project association remain in a separate unassigned-media area/index and are not silently attached to projects.

## Important trade-off

The combined image payload is approximately 466 MiB. Cloudflare Pages' per-file and file-count limits are satisfied, but placing all binaries in the Git repository would substantially increase repository size and every full clone. GitHub recommends keeping repositories ideally below 1 GiB, so this is technically possible but not an especially lean Git workflow.

Preferred implementation sequence:
1. Preserve the source archives outside Git while preparing the media tree.
2. Validate all 849 image files, paths, sizes and manifest associations.
3. Build a reproducible static export containing the images.
4. Upload/deploy the resulting static output to Cloudflare Pages Free.
5. Only add binaries to the Git repository if the chosen Git-based deployment workflow requires them and repository size remains acceptable.

If the Cloudflare Pages Git integration requires all source files in the repository, either commit the original images once (accepting the repository size trade-off) or use a build pipeline that retrieves the archived source assets from a user-controlled source at build time. Do not introduce a paid storage dependency to avoid this trade-off.

## Current state

- R2 subscription was not activated.
- No payment method was added.
- No R2 bucket or API token was created.
- No DNS changes were made.
- No images have yet been uploaded to Cloudflare Pages.
- Existing `src/data/media.json` is only a partial media mapping and must be replaced by the complete verified manifest before production.

## Official Cloudflare Pages Free limits checked 2026-11-20

- 20,000 files per site.
- 25 MiB maximum per individual asset.
- 500 builds per month.
- 20-minute build timeout.

Source: https://developers.cloudflare.com/pages/platform/limits/


---

# Zero-cost Pages media handoff

The three source archives were extracted and verified locally.

## Verified extraction
- 849 image files extracted.
- Total image bytes: 488,394,505 (465.8 MiB).
- Largest file: 8,200,257 bytes (7.82 MiB).
- Duplicate filenames across the three archives: 0.
- Original filenames and bytes preserved.
- SHA-256 checksums generated for every image.

## Handoff package
The extraction package is `BORTHOLUZZI_PAGES_MEDIA_v1.zip` and contains:
- `public/media/` — all 849 original image files.
- `media-file-index.csv` and `media-file-index.json` — filename, local URL, source archive, byte size and SHA-256.
- `README.md` — installation instructions.

## Installation target
Extract the package at the repository root so the images reside under `public/media/`. Next.js static export will copy these files into `out/media/`.

## Important
This package does not rewrite project-to-image associations. The existing `src/data/media.json` remains a partial mapping and must not be treated as the complete manifest. Project gallery URLs should be switched from the legacy CDN to local `/media/<filename>` paths only after the complete audited project mapping is imported and the 849 files are present in the build workspace.

## Deployment status
- The image binaries are prepared in the handoff package, not committed to Git.
- No Cloudflare Pages deployment has been performed.
- No Cloudflare credentials or payment card are required for this preparation.
- R2 remains unused.
- DNS and `main` remain unchanged.
