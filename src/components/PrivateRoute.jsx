import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import PageLoader from './PageLoader'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <PageLoader message="Verifying authentication..." />
  }

  if (user) {
    return children
  }

  return <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute
