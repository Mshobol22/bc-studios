# BC-studios CTO setup commands

Run these in the project root (`bc-studios`).

## 1. Shadcn/UI (already initialized with New York + Slate + CSS variables)

Add the remaining core components:

```powershell
npx shadcn@latest add dialog
npx shadcn@latest add accordion
npx shadcn@latest add dropdown-menu
```

You already have: `button`, `card`, `input`, `textarea`, `sheet`.

## 2. Optional: Clerk for dashboard protection

When you are ready to protect `/dashboard` and app routes:

```powershell
npm install @clerk/nextjs
```

Then in `app/(app)/layout.tsx` wrap children with `<ClerkProvider>` and use Clerk’s `<RedirectToSignIn>` or middleware to guard the `(app)` group.

## 3. Verify dev server

```powershell
npm run dev
```

- `/` — Marketing landing (from `app/(marketing)/page.tsx`)
- `/solutions` — SaaS products
- `/services` — Agency offerings
- `/case-studies` — Portfolio
- `/dashboard` — Placeholder app (to be protected by Clerk)
