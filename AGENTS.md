## Deployment

After every code change is finished (and verified working), commit and push to `origin main` right away — do not wait to be asked. Cloudflare Pages is connected to this GitHub repo and auto-builds/deploys on push to `main`, so pushing *is* the deploy step. Use `./push.sh "commit message"` from the `uupay-website/` directory, or `git add` + `git commit` + `git push origin main` directly.

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
