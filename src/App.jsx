import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ExploreArtworks from './pages/ExploreArtworks'
import AddArtwork from './pages/AddArtwork'
import MyGallery from './pages/MyGallery'
import MyFavorites from './pages/MyFavorites'
import ArtworkDetails from './pages/ArtworkDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import UpdateProfilePage from './pages/UpdateProfile'
import ThemeAnimationDemo from './pages/ThemeAnimationDemo'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Routes>
      {/* Public routes with layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<ExploreArtworks />} />
        <Route path="demo" element={<ThemeAnimationDemo />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="add-artwork" element={
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        } />
        <Route path="my-gallery" element={
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        } />
        <Route path="my-favorites" element={
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        } />
        <Route path="update-profile" element={
          <PrivateRoute>
            <UpdateProfilePage />
          </PrivateRoute>
        } />
        <Route path="artworks/:id" element={
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        } />
      </Route>

      {/* 404 route without layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
