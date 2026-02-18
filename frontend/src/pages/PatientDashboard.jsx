import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyAppointments } from '../services/api'
import Navbar from '../components/Navbar'
import BookAppointment from '../components/BookAppointment'
import AppointmentCard from '../components/AppointmentCard'
import toast from 'react-hot-toast'

export default function PatientDashboard() {
  const { user } = useAuth()
  const [view, setView] = useState('book')
  const [appointments, setAppointments] = useState([])
  const [loadingAppts, setLoadingAppts] = useState(false)

  const fetchAppointments = async () => {
    setLoadingAppts(true)
    try {
      const { data } = await getMyAppointments()
      setAppointments(data.appointments)
    } catch {
      toast.error('Failed to fetch appointments')
    } finally {
      setLoadingAppts(false)
    }
  }

  useEffect(() => {
    if (view === 'view') fetchAppointments()
  }, [view])

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    approved: appointments.filter((a) => a.status === 'approved').length,
    rejected: appointments.filter((a) => a.status === 'rejected').length
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner patient-banner">
          <div className="welcome-text">
            <h2>Hello, {user?.name} 👋</h2>
            <p>Manage your medical appointments with ease</p>
          </div>
          <div className="welcome-avatar patient-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-nav">
          <button
            className={`tab-btn ${view === 'book' ? 'active' : ''}`}
            onClick={() => setView('book')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="12" y1="14" x2="12" y2="18" />
              <line x1="10" y1="16" x2="14" y2="16" />
            </svg>
            Book Appointment
          </button>
          <button
            className={`tab-btn ${view === 'view' ? 'active' : ''}`}
            onClick={() => setView('view')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            My Appointments
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {view === 'book' ? (
            <BookAppointment onBooked={() => setView('view')} />
          ) : (
            <div className="appointments-section">
              {/* Stats Row */}
              {appointments.length > 0 && (
                <div className="stats-row">
                  <div className="stat-chip total">
                    <span className="stat-num">{stats.total}</span>
                    <span className="stat-label">Total</span>
                  </div>
                  <div className="stat-chip pending">
                    <span className="stat-num">{stats.pending}</span>
                    <span className="stat-label">Pending</span>
                  </div>
                  <div className="stat-chip approved">
                    <span className="stat-num">{stats.approved}</span>
                    <span className="stat-label">Approved</span>
                  </div>
                  <div className="stat-chip rejected">
                    <span className="stat-num">{stats.rejected}</span>
                    <span className="stat-label">Rejected</span>
                  </div>
                </div>
              )}

              {loadingAppts ? (
                <div className="loading-state">
                  <div className="loader-ring" />
                  <p>Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <h3>No appointments yet</h3>
                  <p>Book your first appointment with a doctor</p>
                  <button className="btn-primary sm" onClick={() => setView('book')}>
                    Book Now
                  </button>
                </div>
              ) : (
                <div className="appointments-grid">
                  {appointments.map((appt) => (
                    <AppointmentCard key={appt._id} appointment={appt} role="patient" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
