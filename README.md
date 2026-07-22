# HooMee Coffee

Personal site for **HooMee Coffee**, published at
[`https://www.hoomee.cc`](https://www.hoomee.cc).

## Current public surface

- Chinese homepage at `/`
- English homepage at `/en`
- Light, dark and system appearance preferences
- Public contact email: `emiiao@qq.com`
- Localized metadata, Open Graph image, sitemap and favicon

Writing, photos, projects, experience, social profiles and AMA are hidden
until HooMee Coffee supplies public content. Their public route families return
404 and are excluded from navigation and discovery output.

## Development

Use Node 24 and pnpm 10.12.1.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

The complete environment and GitHub/Vercel checklist is in
[`FORK_SETUP.md`](./FORK_SETUP.md).

## Deployment

GitHub Actions owns deployment ordering. The intended branch model is:

- `dev`: staging and integration
- `main`: production
- feature branches: preview environments

Set the GitHub repository variable `PUBLIC_SITE_URL` to
`https://www.hoomee.cc`. Production secrets and Vercel variables are described
in `FORK_SETUP.md`.

## Upstream and license

The application began as a permitted fork of
[`CaliCastle/cali.so`](https://github.com/CaliCastle/cali.so). Reusable source
code is MIT licensed under the included `LICENSE`. Cali Castle's identity,
writing, photographs, artwork, branding, personal data and third-party assets
are not part of that grant and have been removed from the HooMee version.

