# Shamsiddin Bikbov — Frontend Developer Portfolio

React + Vite + Tailwind CSS + Supabase portfolio with a protected admin panel (CRUD, image upload, RLS), search/filters and UZ/EN switching (default: Uzbek).

## Features
Public Home and Projects pages · projects loaded from Supabase · instant search + category filters · featured projects · UZ/EN (saved in localStorage) · Supabase Auth · admin dashboard (add/edit/delete with confirmation) · image upload to Storage · RLS-enforced authorization · responsive, accessible dark UI.

## Tech stack
React 18, Vite, Tailwind CSS 3, React Router 6, Supabase (Postgres, Auth, Storage), lucide-react.

## Folder structure
```
src/
  components/  Navbar Footer Hero About Skills ProjectCard ProjectFilters ProjectGrid ProtectedRoute Loading EmptyState
  pages/       Home ProjectsPage Login AdminDashboard ProjectForm NotFound
  context/     AuthContext LanguageContext
  services/    projectService storageService   (all Supabase queries live here)
  hooks/       useProjects
  data/        translations skills
  lib/         supabase
supabase/schema.sql
vercel.json    (SPA rewrite)
```

## Installation
```bash
npm install
cp .env.example .env   # then fill in the two values
npm run dev
```

## Environment variables
```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```
Use only the publishable (anon) key. Never put the service_role / secret key in the frontend. `.env` is git-ignored.

## Supabase setup
1. Create a project at supabase.com.
2. Project Settings → API: copy the Project URL and the publishable key into `.env`.
3. SQL Editor → paste and run `supabase/schema.sql`. This creates the tables, RLS policies, the `portfolio-images` bucket + storage policies, and 12 **sample** projects (replace them from the admin panel).

## Admin account
1. Authentication → Users → Add user (email + password, tick "Auto confirm").
2. Make it admin in the SQL Editor:
```sql
update public.profiles set role = 'admin' where email = 'YOUR_EMAIL';
```
3. Sign in at `/admin/login`. Roles cannot be changed from the client: `profiles` has no write policies.

## Test the security (RLS)
- Logged out: `/admin` redirects to `/admin/login`. In the browser console, `supabase.from('projects').insert(...)` must return an RLS error.
- Create a second user (role `user`) and sign in: `/admin` redirects to `/`; insert/update/delete must fail.
- Try `update profiles set role='admin'` as that user: must fail.
- Admin user: all CRUD and uploads succeed.

## Add a project
Sign in → Dashboard → Add project → fill UZ/EN titles and descriptions, choose an image (JPG/PNG/WebP, max 3 MB), category, technologies (`React, Tailwind CSS`), links, tick Featured to show on Home → Save.

## Production build
```bash
npm run build && npm run preview
```

## Deploy to Vercel
1. Create a GitHub repository and push the project.
2. Vercel → Add New Project → import the repo (Vite preset is detected).
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Environment Variables.
4. Deploy. `vercel.json` rewrites all routes to `index.html`, so `/projects` and `/admin` work on refresh.
5. Supabase → Authentication → URL Configuration: set **Site URL** to your production URL (e.g. `https://your-app.vercel.app`) and add Redirect URLs `http://localhost:5173/**` and `https://your-app.vercel.app/**`.

## Before presenting
Set your real GitHub URL and email in `src/data/translations.js` (`GITHUB`, `EMAIL`).

## Screenshots
Add screenshots to `docs/` and link them here.

## Future improvements
Drag-to-reorder projects, project detail pages, contact form storing messages in Supabase, image resizing on upload, tests.
