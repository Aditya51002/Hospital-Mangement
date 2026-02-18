import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyAppointments } from '../services/api'
import Navbar from '../components/Navbar'
import AppointmentCard from '../components/AppointmentCard'
import toast from 'react-hot-toast'

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [view, setView] = useState('pending')
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const { data } = await getMyAppointments()
      setAppointments(data.appointments)
    } catch {
      toast.error('Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const pending = appointments.filter((a) => a.status === 'pending')
  const approved = appointments.filter((a) => a.status === 'approved')
  const rejected = appointments.filter((a) => a.status === 'rejected')

  const displayed = view === 'pending' ? pending : view === 'approved' ? approved : rejected

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner doctor-banner">
          <div className="welcome-text">
            <h2>Hello, {user?.name} 👨‍⚕️</h2>
            <p>Review and manage your patient appointments</p>
          </div>
          <div className="welcome-avatar doctor-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="doctor-stats">
          <div className="doctor-stat-card total">
            <div className="dsc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div>
              <span className="dsc-num">{appointments.length}</span>
              <span className="dsc-label">Total</span>
            </div>
          </div>
          <div className="doctor-stat-card pending">
            <div className="dsc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <span className="dsc-num">{pending.length}</span>
              <span className="dsc-label">Pending</span>
            </div>
          </div>
          <div className="doctor-stat-card approved">
            <div className="dsc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <span className="dsc-num">{approved.length}</span>
              <span className="dsc-label">Approved</span>
            </div>
          </div>
          <div className="doctor-stat-card rejected">
            <div className="dsc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <span className="dsc-num">{rejected.length}</span>
              <span className="dsc-label">Rejected</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {[
            { key: 'pending', label: `Pending (${pending.length})` },
            { key: 'approved', label: `Approved (${approved.length})` },
            { key: 'rejected', label: `Rejected (${rejected.length})` }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`filter-tab ${view === tab.key ? 'active ' + tab.key : ''}`}
              onClick={() => setView(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Appointment List */}
        <div className="tab-content">
          {loading ? (
            <div className="loading-state">
              <div className="loader-ring" />
              <p>Loading appointments...</p>
            </div>
          ) : displayed.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3>No {view} appointments</h3>
              <p>
                {view === 'pending'
                  ? 'No new appointment requests at this time'
                  : `No ${view} appointments found`}
              </p>
            </div>
          ) : (
            <div className="appointments-grid">
              {displayed.map((appt) => (
                <AppointmentCard
                  key={appt._id}
                  appointment={appt}
                  role="doctor"
                  onUpdate={fetchAppointments}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
