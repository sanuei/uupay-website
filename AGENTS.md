## Deployment

After every code change is finished (and verified working), commit + push AND deploy right away — do not wait to be asked. These are two separate steps here:

1. **Git**: `./push.sh "commit message"` (or `git add` + `git commit` + `git push origin main`) — keeps GitHub in sync, but does **not** trigger a deploy.
2. **Deploy**: the Cloudflare Pages project `uupay-website` is *not* Git-connected (confirmed via `wrangler pages project list` — Git Provider: No), so pushing alone does nothing. Actually ship the change with:
   ```
   npm run build
   wrangler pages deploy dist --project-name uupay-website --branch main --commit-dirty=true
   ```

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
