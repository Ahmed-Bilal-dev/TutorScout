import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, allowedRole }) {
    const { user, userData, loading } = useAuth()

    if (loading) {
        return null
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (allowedRole && userData?.role !== allowedRole) {
        if (userData?.role === 'tutor') {
            return <Navigate to="/tutor-dashboard" replace />
        }

        if (userData?.role === 'student') {
            return <Navigate to="/student-dashboard" replace />
        }

        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute