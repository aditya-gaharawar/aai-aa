# WebSpaceAI website

Complete tracked website source and assets, exported from the aai-a Site repository.
Source commit: ea7f31f185746a52635ce76e88ce28d24b468da7

## Run locally

Install Node.js 20.9 or newer, then run:

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
```

The static website is generated in out/. Dependencies are restored by npm ci; node_modules, Git internals, credentials, and build caches are excluded. Browser-local saved notes and workspaces are not part of the website source.
