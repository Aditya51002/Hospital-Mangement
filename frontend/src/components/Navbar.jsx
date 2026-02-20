import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <span>HealthConnect</span>
      </div>

      <div className="nav-right">
        <div className={`nav-role-badge ${user?.role}`}>
          {user?.role === 'doctor' ? '👨‍⚕️ Doctor' : '🏥 Patient'}
        </div>
        <div className="nav-user">
          <div className="nav-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="nav-name">{user?.name}</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  )
}
