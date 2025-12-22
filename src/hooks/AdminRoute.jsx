import { Navigate, useLocation } from "react-router-dom"

function AdminRoute({ user, children }) {
  const location = useLocation()
  
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (user.role !== "admin") return <Navigate to="/" replace />
  return children
}

export default AdminRoute
