@AGENTS.md

# Rules

- Use TypeScript strictly — no `any` unless justified with a comment.
- Follow the existing folder structure: `src/app`, `src/components`, `src/lib`, `src/messages`.
- Use shadcn/ui components where possible instead of building custom UI from scratch.
- Use Tailwind CSS for styling — avoid inline styles or separate CSS files unless necessary.
- All static UI text (nav, buttons, labels, page chrome) must go through next-intl translations (`th.json` / `en.json`) — no hardcoded strings in components.
- Dynamic content (product titles, descriptions, etc.) stores both `th` and `en` versions inline in the data itself, not in the translation files — e.g. `title: { th: "...", en: "..." }` in `src/lib/products.ts`. Read it as `product.title[locale]`.
- Keep components small and single-purpose. Split large components into smaller ones.
- After completing a task, run `npm run build` (and `npm run lint`) to confirm no errors before considering the task done.
- If a task involves logic that could break (forms, data fetching, utils), write or update a basic test if a test setup exists.
- Do not install new dependencies without checking if an existing one already covers the need.
- Ask before making structural changes (routing, folder layout, config files) that affect the whole project.
- When you deliberately leave something out of a task — a follow-up you flagged, work blocked on a decision or missing config, a shortcut taken knowingly — record it in `docs/TODO.md` before finishing. Write each entry so a session with no memory of this conversation can act on it: what is missing, why it was skipped, the concrete steps to do it, and the files involved. Delete the entry when the work ships. Do not log routine ideas or things already visible in the code — only work that was actually deferred.