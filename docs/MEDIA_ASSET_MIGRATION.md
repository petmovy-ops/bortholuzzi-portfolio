# Media asset migration — Cloudflare Pages Free

## Verified source inventory (2026-11-20)

The three image archives contain exactly 849 image files:

| Archive | Images | Uncompressed image data |
|---|---:|---:|
| `Archive.zip` | 444 | 253.92 MB |
| `Archive 2.zip` | 269 | 162.01 MB |
| `bortholuzzi_missing_assets.zip` | 136 | 72.47 MB |
| **Total** | **849** | **488.40 MB** |

The largest individual image is 8.20 MB, below Cloudflare Pages' 25 MiB per-file asset limit. The 849 files are also below Pages Free's 20,000-file limit. The 82 image files in `BORTHOLUZZI_ACERVO_01_PAGINAS_E_CATALOGOS.zip` are screenshots/reference material and are not part of this 849-image production asset inventory.

Official limits: https://developers.cloudflare.com/pages/platform/limits/

## Cost decision

The project requirement is zero recurring cost. Do not activate R2, add a payment method, or create R2 API tokens for this migration.

Use Cloudflare Pages Free for the static site and its image assets. No R2 bucket is required.

## Important deployment choice

The existing project is intended to use Cloudflare Pages Git integration with GitHub. Keep that approach. Do not create a Direct Upload Pages project as a substitute: Cloudflare documents that a Direct Upload project cannot later be switched to Git integration. Wrangler-based Direct Upload is possible, but would add credential and deployment steps that are unnecessary for this Git-integrated project.

## Asset delivery strategy

- Preserve the three original ZIP archives unchanged as the source-of-truth backup.
- Generate optimized WebP delivery derivatives from the original images; never overwrite originals.
- Keep original filenames and a machine-readable mapping from original filename to derivative filename.
- Use only explicit project associations from the audited media inventory.
- Keep unassociated media in a separate review collection; do not infer project assignments.
- Confirm every output file is below 25 MiB and the total site file count remains below 20,000.
- Keep the Git repository reasonably sized. Review total derivative size before committing media binaries.

## Current implementation status

- Original source archives inspected locally: 849 images, 488.40 MB uncompressed.
- Largest image: 8.20 MB.
- No original image binaries have been committed to the repository.
- The current `src/data/media.json` is partial and must not be treated as a complete final manifest.
- The current gallery code still contains references to the legacy Adobe Portfolio CDN.
- No R2 subscription, payment method, token, DNS change, production deployment, or merge has been made.

## Next actions

1. Reconcile the full 849-file inventory with the asset mapping CSV, including duplicate filenames and archive provenance.
2. Generate optimized WebP derivatives and a complete manifest without changing originals.
3. Compare total derivative size and decide whether committing delivery files to Git is acceptable.
4. Add assets to the Git-integrated Pages build and validate a preview deployment.
5. Only after visual verification, update the canonical site and DNS with explicit approval.
