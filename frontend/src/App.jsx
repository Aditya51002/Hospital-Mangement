import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Register from './pages/Register'
import Login from './pages/Login'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import SelectRole from './pages/SelectRole'

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="full-loader"><div className="loader-ring" /></div>
  if (!user) return <Navigate to="/login" replace />
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'doctor' ? '/doctor' : '/patient'} replace />
  }
  return children
}

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="full-loader"><div className="loader-ring" /></div>
  if (user) return <Navigate to={user.role === 'doctor' ? '/doctor' : '/patient'} replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SelectRole />} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route
        path="/patient"
        element={<PrivateRoute allowedRole="patient"><PatientDashboard /></PrivateRoute>}
      />
      <Route
        path="/doctor"
        element={<PrivateRoute allowedRole="doctor"><DoctorDashboard /></PrivateRoute>}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}
