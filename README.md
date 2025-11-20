# ARTIFY Client

Frontend application for ARTIFY - A Creative Artwork Showcase Platform

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
├── src/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ThemeToggle.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx     # Firebase authentication
│   │   └── ThemeContext.jsx    # Theme management
│   ├── firebase/
│   │   └── firebase.config.js  # Firebase initialization
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   └── useTheme.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx      # Main layout with navbar + footer
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ExploreArtworks.jsx
│   │   ├── AddArtwork.jsx      # Protected
│   │   ├── MyGallery.jsx       # Protected
│   │   ├── MyFavorites.jsx     # Protected
│   │   ├── ArtworkDetails.jsx  # Protected
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx                 # Route configuration
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── .env.local                 # Environment variables
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env.local file (see below)

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Get Firebase credentials from [Firebase Console](https://console.firebase.google.com/)

## 🛣️ Routes

### Public Routes
- `/` - Home page
- `/explore` - Explore all artworks
- `/login` - Login page
- `/register` - Register page

### Protected Routes (Require Authentication)
- `/add-artwork` - Add new artwork
- `/my-gallery` - User's own artworks
- `/my-favorites` - User's favorited artworks
- `/artworks/:id` - Artwork details page

### Special Routes
- `*` - 404 Not Found (no navbar/footer)

## 🎨 Features

✅ **Firebase Authentication**
- Email/Password authentication
- Google Sign-In
- Protected routes
- User session management

✅ **Theme Toggle**
- Light/Dark mode
- Persistent theme preference (localStorage)
- Smooth transitions

✅ **Responsive Design**
- Mobile-first approach
- Tailwind CSS utilities
- DaisyUI components

✅ **React Router v6**
- Client-side routing
- Nested routes
- Protected routes
- 404 handling

✅ **Context API**
- AuthContext for authentication
- ThemeContext for theme management

✅ **Custom Hooks**
- useAuth() - Access authentication
- useTheme() - Access theme functions

✅ **Toast Notifications**
- Success/error messages
- react-hot-toast integration

## 🔐 Authentication Flow

### Register
1. User fills registration form
2. Creates account with Firebase
3. Updates profile with display name
4. Redirects to home page

### Login
1. User enters email/password or uses Google
2. Firebase authenticates
3. User state updated in AuthContext
4. Redirects to intended page or home

### Protected Routes
1. PrivateRoute checks authentication
2. Shows loading spinner while checking
3. Redirects to login if not authenticated
4. Renders component if authenticated

## 🎯 Using AuthContext

```javascript
import { useAuth } from '../hooks/useAuth'

function MyComponent() {
  const { user, loading, signIn, logOut, createUser, signInWithGoogle, getIdToken } = useAuth()

  // Get Firebase token for API calls
  const token = await getIdToken()

  // Make authenticated API request
  fetch('/api/artworks', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
```

## 🎨 Using ThemeContext

```javascript
import { useTheme } from '../hooks/useTheme'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

## 🎨 Custom Tailwind Classes

### Buttons
```jsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-outline">Outline Button</button>
```

### Cards
```jsx
<div className="card card-hover">Card with hover effect</div>
```

### Inputs
```jsx
<input className="input-field" />
<input className="input-field input-error" />
```

### Text
```jsx
<h1 className="gradient-text">Gradient Text</h1>
```

### Animations
```jsx
<div className="animate-fade-in">Fade in animation</div>
<div className="animate-slide-in-left">Slide from left</div>
<div className="animate-slide-in-right">Slide from right</div>
```

## 🚀 Deployment

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard
4. The `_redirects` file handles SPA routing

### Vercel

1. Import project from Git
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variables

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## 📝 Development Notes

- CSS errors for `@tailwind` and `@apply` are expected (Tailwind directives)
- Use `import.meta.env.VITE_*` for environment variables (Vite convention)
- Firebase token automatically refreshes on API calls
- Theme preference persists in localStorage
- All forms include basic validation

## 🔧 Available Scripts

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 📚 Libraries Documentation

- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Awesome Reveal](https://www.npmjs.com/package/react-awesome-reveal)

## 🐛 Troubleshooting

**Firebase not initialized:**
- Check .env.local file
- Verify Firebase credentials
- Restart dev server after adding env vars

**Routes not working:**
- Check React Router configuration
- Verify _redirects file for deployment

**Theme not persisting:**
- Check localStorage in browser
- Verify ThemeContext implementation

## 📄 License

MIT
