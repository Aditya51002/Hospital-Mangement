import { useState } from 'react'
import { updateAppointmentStatus } from '../services/api'
import toast from 'react-hot-toast'

const STATUS_CONFIG = {
  pending: { label: 'Pending', cls: 'badge-pending' },
  approved: { label: 'Approved', cls: 'badge-approved' },
  rejected: { label: 'Rejected', cls: 'badge-rejected' }
}

const DEPT_COLORS = {
  Cardiology: '#ef4444',
  Neurology: '#8b5cf6',
  Orthopedics: '#f97316',
  Pediatrics: '#ec4899',
  Oncology: '#06b6d4',
  Dermatology: '#84cc16',
  Psychiatry: '#a855f7',
  'General Medicine': '#0ea5e9'
}

export default function AppointmentCard({ appointment, role, onUpdate }) {
  const [updating, setUpdating] = useState(null)
  const statusCfg = STATUS_CONFIG[appointment.status]
  const deptColor = DEPT_COLORS[appointment.department] || '#64748b'

  const handleAction = async (status) => {
    setUpdating(status)
    try {
      await updateAppointmentStatus(appointment._id, status)
      toast.success(`Appointment ${status}`)
      onUpdate?.()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="appt-card">
      <div className="appt-card-top" style={{ borderTopColor: deptColor }}>
        <div className="appt-dept-badge" style={{ background: `${deptColor}18`, color: deptColor }}>
          {appointment.department}
        </div>
        <span className={`status-badge ${statusCfg.cls}`}>{statusCfg.label}</span>
      </div>

      <div className="appt-card-body">
        <div className="appt-info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <div>
            <span className="info-label">{role === 'doctor' ? 'Patient' : 'Doctor'}</span>
            <span className="info-value">
              {role === 'doctor' ? appointment.patientName : appointment.doctorName}
            </span>
          </div>
        </div>

        {role === 'doctor' && (
          <div className="appt-info-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <div>
              <span className="info-label">Doctor</span>
              <span className="info-value">{appointment.doctorName}</span>
            </div>
          </div>
        )}

        <div className="appt-meta">
          <div className="appt-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="appt-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{appointment.timeSlot}</span>
          </div>
        </div>
      </div>

      {/* Doctor Actions */}
      {role === 'doctor' && appointment.status === 'pending' && (
        <div className="appt-actions">
          <button
            className="btn-approve"
            onClick={() => handleAction('approved')}
            disabled={!!updating}
          >
            {updating === 'approved' ? <span className="btn-spinner sm" /> : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Approve
              </>
            )}
          </button>
          <button
            className="btn-reject"
            onClick={() => handleAction('rejected')}
            disabled={!!updating}
          >
            {updating === 'rejected' ? <span className="btn-spinner sm" /> : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Reject
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
