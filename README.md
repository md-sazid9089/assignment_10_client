# ARTIFY Client

Frontend application for ARTIFY - A Creative Artwork Showcase Platform
live url :https://assignment-10-client-h8xu.vercel.app
## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Firebase** - Authentication (Email/Password + Google)
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **React Awesome Reveal** - Animation library
- **React Simple Typewriter** - Typing animation
- **React Image Gallery** - Image carousel
- **React Tooltip** - Tooltips

## 📁 Project Structure

```
artify-client/
├── public/
│   └── _redirects              # Netlify SPA routing
﻿# Client — Art Gallery (Vite + React)

This folder contains the frontend (client) application for the Art Gallery project. It is a Vite + React single-page application that authenticates users with Firebase and communicates with a separate backend API for data persistence and user-scoped operations.

## 1. Project Overview

- Purpose: Provide a responsive UI for browsing and managing artworks in a MERN-style stack. The client handles presentation, client-side routing and authentication; the backend provides the API and data persistence (Express + MongoDB).
- Key UI features: artwork listing, artwork detail view, liking, favoriting, add/update/delete for user content, search and category filters, theme toggle, and in-app feedback (loaders/toasts).

## 2. Live Client URL

- Deployed Vercel client URL: https://<your-vercel-client-url>
- Client environment variable expected for API base URL: `VITE_API_URL`

Replace the placeholder above with your actual Vercel deployment URL.

## 3. Technologies Used

- React (Vite)
- React Router (v6)
- Firebase Authentication (Email/Password and Google)
- Axios
- Tailwind CSS
- Additional UI libraries present in the project: React Image Gallery, React Simple Typewriter, React Awesome Reveal, React Tooltip, React Hot Toast

## 4. Features

- Navbar with conditional rendering based on authentication state (links, user menu, login/register)
- Public pages: Home, Explore Artworks, 404 Not Found
- Private pages (protected): Add Artwork, Artwork Details, My Gallery, My Favorites
- Search and category filtering on Explore page
- Like system with immediate UI update and backend persistence
- Favorites system persisted in backend and displayed per-user
- Update and delete modals for user-owned artworks
- Theme toggle with `localStorage` persistence and initial hydration on app load
- Loading spinners, skeleton loaders, and toast notifications for user feedback
- Responsive layout and consistent Tailwind-based styling

## 5. Project Structure

Key folders and files (client):

```
assignment_10_client/
├── public/
│   └── _redirects
├── src/
│   ├── components/        # Reusable UI components and modals
│   ├── context/           # AuthContext.jsx, ThemeContext.jsx
│   ├── data/              # demo data files
│   ├── firebase/          # firebase.config.js
│   ├── hooks/             # useAuth.jsx, useTheme.jsx
│   ├── layouts/           # MainLayout.jsx
│   ├── pages/             # Public and private pages
│   ├── services/          # api.js (Axios instance and helpers)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 6. Environment Variables

Required client-side Vite variables (create `.env.local`):

- `VITE_API_URL` — Base URL for the backend API (e.g., `https://api.example.com/api`)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Only variables prefixed with `VITE_` are exposed to the browser. Do not commit `.env` files.

## 7. Installation and Setup

1. Clone repository:

```powershell
git clone <repo-url>
```

2. Enter client directory:

```powershell
cd assignment_10_client
```

3. Install dependencies:

```powershell
npm install
```

4. Create `.env.local` and add the `VITE_` variables listed above.

5. Start the development server:

```powershell
npm run dev
```

## 8. API Integration Notes

- The client uses a configured Axios instance in `src/services/api.js` that uses `import.meta.env.VITE_API_URL` as the base URL.
- Typical request patterns:
  - List artworks: `GET ${VITE_API_URL}/artworks`
  - Get artwork details: `GET ${VITE_API_URL}/artworks/:id`
  - Create artwork: `POST ${VITE_API_URL}/artworks` (body contains artwork fields and user info)
  - Update artwork: `PATCH ${VITE_API_URL}/artworks/:id`
  - Delete artwork: `DELETE ${VITE_API_URL}/artworks/:id`
  - Favorites: `POST ${VITE_API_URL}/favorites` and `DELETE ${VITE_API_URL}/favorites/:id`
  - Likes: `PATCH ${VITE_API_URL}/artworks/:id/like` or similar endpoints depending on server routes

- Authentication and demo mode: The client authenticates users with Firebase and may attach tokens to requests. In demo/back-end setups the server may accept `userEmail` in the request body instead of validating Firebase tokens server-side — see Known Limitations.

## 9. Private Route Protection

- Implementation: `PrivateRoute` (component) reads `user` and `loading` from `AuthContext` (`useAuth()` hook). While `loading` is true a spinner is shown; if `user` is null the route redirects to `/login`.
- Behavior: Unauthenticated users are redirected to login and, upon successful login, are returned to the originally requested page when supported by the router state.

## 10. Deployment Instructions (Vercel)

1. Create/import the project in Vercel and connect the repository.
2. Configure build settings:
   - Framework preset: Vite (or leave default)
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add Vercel Environment Variables (`VITE_API_URL`, `VITE_FIREBASE_*`) under Project Settings → Environment Variables.
4. Deploy. After the backend is deployed, update `VITE_API_URL` in Vercel to point to the backend production URL and redeploy.

## 11. Known Limitations

- No Firebase Admin validation in demo mode: The backend may trust the client-provided `userEmail` rather than verifying Firebase ID tokens.
- Likes and favorites may rely on client-provided email for scoping in demo setups.
- Optimistic UI updates may lead to temporary inconsistencies if server requests fail.

If you want, I can run a local production build and verify the client deploys successfully to Vercel.

---

Replace the Vercel URL placeholder and add real `VITE_` values before deploying.
