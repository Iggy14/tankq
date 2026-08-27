# Prompt: Refresh stale images after replacing files in `public/`

Paste the block below into a fresh Claude Code session in this repo whenever you
have swapped an image on disk but the browser still shows the old one.

---

## The prompt

```
I replaced one or more image files in public/ (same filenames), but the app still
renders the old images. Clear the stale caches for me:

1. Delete Next.js's dev image-optimizer cache: `.next/dev/cache/images/`
   (Next 16 location — it used to be `.next/cache/images`, check both).
   You do NOT need to stop the dev server to delete it; it releases cleanly on
   Windows. Confirm the directory is gone afterwards.

2. Report how many cache entries were removed and their total size, so I can see
   the cache was actually the culprit.

3. Tell me which files in public/ have changed recently (`git status` plus mtimes)
   so I can confirm the new images are on disk where I think they are.

4. Remind me to hard-reload the browser (Ctrl+Shift+R), since /_next/image
   responses are cached client-side with long-lived headers and the server-side
   delete alone will not fix that.

Do NOT delete the whole .next directory — that forces a full rebuild and is not
needed. Do NOT restart the dev server unless a hard reload still shows old images.
```

---

## Why this is needed

`next/image` keys its optimizer cache on the **source URL + width + quality** —
not on the file's contents. Replacing `public/footer/tank.png` with a new file at
the same path is invisible to that key, so Next happily serves the previously
optimized bytes. The browser then holds its own copy of the `/_next/image?url=...`
response under a long `Cache-Control`, which is why clearing the server cache
alone is not enough.

## Manual one-liner

If you would rather not spin up a session:

```bash
rm -rf .next/dev/cache/images
```

Then hard-reload with **Ctrl+Shift+R**. For sustained asset work, open DevTools →
Network → check **Disable cache** and leave it on.

## Avoiding the problem

Change the *filename* when you swap an asset (`tank.png` → `tank-v2.png`) and
update the reference in code. A new URL means a new cache key, so both caches miss
and neither needs clearing.

## Image paths in this repo

| Path | Used by |
| --- | --- |
| `public/brand/` | `src/components/header.tsx`, `src/components/footer.tsx` |
| `public/hero/` | `src/components/hero.tsx` |
| `public/why/` | `src/components/why-tankq-slideshow.tsx` |
| `public/footer/` | `src/components/footer-tank.tsx` |
| `public/images/products/` | `src/lib/products.ts` |
