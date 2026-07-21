# Fork setup and deployment

This repository contains the reusable v3 application, but it is not a generic
template yet. The original author licenses the application source under MIT;
personal writing, photos, identity, branding, personal data and third-party
assets are explicitly outside that grant. Replace or remove every item below
before publishing a fork.

## 1. Replace the public identity

Search for the original identity before every release:

```bash
rg -n --glob '!pnpm-lock.yaml' \
  'Cali Castle|CaliCastle|calicastle|cali\.so|Zolplay|zolplay|hi@cali\.so|xhslink'
```

Primary editing surfaces:

| Content | Files |
| --- | --- |
| Homepage biography and contact links | `components/home-introduction.tsx` |
| Portraits, avatar and Xiaohongshu art | `public/images/` |
| Experience, records and books | `lib/personal.ts` |
| Projects | `lib/projects.ts`, `public/images/projects/` |
| Social cards and fallback data | `content/social.json`, `content/github.json`, `lib/social-live.ts` |
| Footer identity and contacts | `components/site-footer.tsx` |
| Metadata and Open Graph signatures | `lib/public-page-metadata.ts`, `lib/locale-metadata.ts`, `lib/og-image.tsx` |
| Writing and colocated media | `content/blog/` |
| Redirects and historical URL assertions | `content/legacy-url-manifest.json` |
| Third-party previews | `content/link-previews.json` |

## 2. Local environment

Use Node 24 and pnpm 10.12.1. Copy `.env.example` to `.env.local`, then fill
the required values. Do not commit `.env.local`.

The public URL pair must use your domain:

```dotenv
PUBLIC_SITE_URL=https://example.com
SITE_URL=https://example.com
```

Always-required runtime values:

- CRUD-only `DATABASE_URL` (Neon PostgreSQL)
- `ADMIN_EMAIL`
- 32-byte base64 `AMA_ENCRYPTION_KEY`
- 32-byte base64 `RATE_LIMIT_HASH_KEY`
- Clerk publishable and secret keys for owner admin
- Bunny Media zone, password, CDN origin and API key
- `MEDIA_ENCRYPTION_KEY`

Stripe, Resend, Google Calendar, Tencent Meeting, Google Maps and production
Upstash credentials are provider pairs. Leave both values blank while a
capability is not configured; half-configured pairs fail startup by design.

## 3. GitHub repository model

Use `dev` as the long-lived staging branch and `main` as production. Feature
branches target `dev`; a reviewed `dev` → `main` pull request releases.

Create GitHub environments named `preview`, `staging` and `production`.
Production should require review and hold only production credentials.

Repository variables used by deployment:

- `PUBLIC_SITE_URL`
- `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- `NEON_PROJECT_ID`, `NEON_MIGRATION_ROLE`, `NEON_RUNTIME_ROLE`, `NEON_DATABASE`

Environment secrets used by deployment:

- `VERCEL_TOKEN`
- `NEON_API_KEY`
- `MIGRATION_DATABASE_URL` (production only; never a Vercel runtime variable)

The remaining application variables belong in the matching Vercel
Development/Preview/Production environment. Disable Vercel Git deployments:
GitHub Actions owns migration ordering and deploys the exact migrated commit.

## 4. Custom domain

1. Add the domain to the Vercel project.
2. Apply the DNS records Vercel shows for the apex and optional `www` host.
3. Set `PUBLIC_SITE_URL` and Production `SITE_URL` to the canonical HTTPS
   origin. Use a stable staging alias for staging `SITE_URL`.
4. Add the same origins to Clerk allowed origins and provider callback URLs.
5. Verify the certificate, canonical URLs, feeds, sitemap and Open Graph URLs.

## 5. Release checks

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test:unit
pnpm test:localization
pnpm test:deployment
pnpm build
pnpm test:browser
pnpm verify:links
pnpm verify:public-discovery
pnpm verify:security-boundary
```

Do not publish while the identity search still returns deployable Cali content.

