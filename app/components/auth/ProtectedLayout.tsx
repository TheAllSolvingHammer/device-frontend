import { useAuth } from './AuthProvider'
import { Navigate, Outlet, useLocation } from 'react-router'
export default function ProtectedLayout() {
    const { isAuthenticated } = useAuth()
    let location = useLocation()
    if (!isAuthenticated) {
        return <Navigate to='/login' replace state={{ from: location }}
        />
    }
    return <Outlet />
}
