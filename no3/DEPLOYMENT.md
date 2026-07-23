# HooMee No.3 deployment

Production URL: https://www.hoomee.cc/no3/

## Package contents

- `index.html`
- `styles.css`
- `app.js`
- `assets/` — only assets referenced by the packaged HTML and CSS

Upload this package as the existing website's `no3` directory. The package uses
relative URLs, so it can be served from `/no3/` without changing the website root.

## Rollback

Delete only the deployed `no3` directory. Do not delete or replace the website
root, its `CNAME`, or any existing section directories.
