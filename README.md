# PDPA_2 — Landing (UAT)

Quick scaffold mirroring `PDPA` tech: Vite frontend and a simple Node `express` static server for UAT.

Run locally (dev with Vite):

```bash
npm install
npm run dev
```

Or run the simple Node static server (serves the files directly):

```bash
npm install
npm run serve
```

Notes:
- The landing page uses `/assets/bg.png` as the background image and applies a blur of `0.25px`.
- Layout is responsive with a 16:9 aspect ratio.
- For Firebase deployment later, the `build` output from `vite build` can be used.
