# KASDA Vote (kasdavote.com)

Static marketing site for **Kapchorwa Students' Development Association** elections.

- **Apex domain:** `kasdavote.com` — this site
- **Voting app:** `cast.kasdavote.com` — sibling project [`kasda-ovs`](../kasda-ovs)

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## Brand

Visual identity matches KASDA-OVS: Inter, pink `#db2777`, navy `#1e3a8a`, pink→navy hero, pink→blue CTAs.

## Deploy notes

Serve these static files at the apex host. Point casting CTAs at `https://cast.kasdavote.com` (already wired in `index.html`). Configure the OVS app’s `SITE_PUBLIC_URL`, `ALLOWED_HOSTS`, and `CSRF_TRUSTED_ORIGINS` for the cast subdomain separately.
