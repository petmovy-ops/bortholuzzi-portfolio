# Bortholuzzi Portfolio

Rebuild of [bortholuzzi.com](https://www.bortholuzzi.com).

## Stack

- Next.js App Router
- TypeScript
- Static export
- Cloudflare Pages

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

The static site is generated in `out/`.

## Cloudflare Pages

Connect this repository to Cloudflare Pages and configure:

- Framework preset: Next.js (Static HTML Export)
- Build command: `npx next build`
- Build output directory: `out`

Use a preview deployment for review. Production branch and domain/DNS changes must wait for explicit project approval. Do not change the UOL domain DNS during the migration until the rebuilt site has been reviewed and approved.

## Content migration rules

- Preserve existing canonical paths wherever possible.
- Treat the audited project and media indexes as the source of truth.
- Do not infer image/project relationships, credits, dates, tags or descriptions.
- Keep unassociated media available for manual review.
- Do not delete original assets during migration.
- PETMOVY remains an independent project and is not part of this repository.
