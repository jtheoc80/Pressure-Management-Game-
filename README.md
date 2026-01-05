This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Preview/Content-Review Mode

Preview mode allows content reviewers to access all training scenarios without authentication or completing prerequisites. This is useful for reviewing scenario content.

### How to Enable

**Option 1: Environment Variable (Recommended for local development)**

Create a `.env.local` file in the project root:

```bash
CONTENT_REVIEW_MODE=true
```

Then restart the dev server. All scenarios will be unlocked.

**Option 2: URL Parameter (Quick access)**

Add `?preview=1` to any URL:
- `http://localhost:3000?preview=1`
- `http://localhost:3000/psv-quest?preview=1`
- `http://localhost:3000/learn?preview=1`

### What Preview Mode Does

- ✅ Unlocks all training scenarios (no prerequisites required)
- ✅ Unlocks Hard Mode (normally requires 3 scores ≥85)
- ✅ Unlocks all academy lessons
- ✅ Allows navigation to any scenario page
- ✅ Shows a yellow banner: "Preview Mode: Progress/XP not saved"
- ⛔ Does NOT save XP, badges, or progress
- ⛔ Does NOT persist attempt records

### Security

Preview mode is **disabled by default** and has multiple safety checks:

1. **Vercel Production Block**: Preview mode is always disabled when `VERCEL_ENV=production`, even if `CONTENT_REVIEW_MODE=true` is set
2. **URL Parameter Block**: The `?preview=1` URL parameter only works in non-production environments
3. **Cookie-based Detection**: A short-lived cookie (`preview_mode=true`) is set to propagate preview state

### Files Changed

- `lib/preview-mode.ts` - Core preview mode detection logic
- `lib/preview-mode-client.ts` - Client-side utilities
- `components/PreviewModeBanner.tsx` - UI banner component
- `middleware.ts` - Auth bypass and cookie setting
- `app/psv-quest/page.tsx` - Scenario list unlock logic
- `app/psv-quest/[id]/page.tsx` - Scenario page access
- `app/psv-quest/[id]/results/page.tsx` - No-op progress writes
- `app/learn/page.tsx` - Academy lesson unlock logic
- `app/page.tsx` - Homepage unlock logic
- `components/psv/LevelCard.tsx` - Card unlock display
- `components/landing/GuidedPath.tsx` - Learning path unlock

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
