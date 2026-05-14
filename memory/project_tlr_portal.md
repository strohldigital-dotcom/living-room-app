---
name: project-tlr-portal
description: TLR member portal demo app — role switcher PoC for client presentation
metadata:
  type: project
---

The Living Room at Princeton (TLR) member portal — a demo/PoC with no real auth, uses localStorage role switcher.

**Why:** Client presentation showing three user views (Member, Family, Staff).

**How to apply:** This is a demo app. No real auth needed. Role is stored as `tlr_role` in localStorage. Three roles: `member`, `family`, `staff`.

## Brand colors
- Green Room: #3DAF2C
- Sun Room: #FDAB1C
- Mud Room: #1A1A1A
- Great Room: #47C8F0
- Tibet Room: #F0130F

## Stack
- Next.js 16.2.6 (App Router), React 19, Tailwind v4 (CSS-first, `@import 'tailwindcss'`)
- Supabase client in `/lib/supabase.js` (env vars in `.env.local`)
- All pages are `'use client'` (localStorage + useRouter)

## File structure
- `app/page.js` — landing page with role selector cards
- `app/portal/page.js` — full portal with sidebar nav + 12 content sections (role × 4 nav items)
- `lib/supabase.js` — Supabase client

## Portal nav items (4)
Home (#3DAF2C), Schedule (#47C8F0), Resources (#FDAB1C), Progress (#1A1A1A)
