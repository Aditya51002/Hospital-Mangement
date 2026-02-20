import { useState } from 'react'
import { DEPARTMENTS, TIME_SLOTS } from '../data/doctors'
import { bookAppointment, getAllDoctors } from '../services/api'
import toast from 'react-hot-toast'

export default function BookAppointment({ onBooked }) {
  const [form, setForm] = useState({
    department: '',
    doctorId: '',
    date: '',
    timeSlot: ''
  })
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState([])

  const handleDeptChange = async (e) => {
    const department = e.target.value
    setForm({ ...form, department, doctorId: '' })
    if (department) {
      try {
        const response = await getAllDoctors()
        setDoctors(response.data.doctors)
      } catch (err) {
        toast.error('Failed to load doctors')
        setDoctors([])
      }
    } else {
      setDoctors([])
    }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.department || !form.doctorId || !form.date || !form.timeSlot) {
      return toast.error('Please fill all fields')
    }
    setLoading(true)
    try {
      await bookAppointment(form)
      toast.success('Appointment booked successfully!')
      setForm({ department: '', doctorId: '', date: '', timeSlot: '' })
      setDoctors([])
      onBooked?.()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="book-card">
      <div className="book-card-header">
        <div className="book-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div>
          <h3>Book an Appointment</h3>
          <p>Schedule a visit with our specialists</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-row">
          {/* Department */}
          <div className="form-group">
            <label>Department</label>
            <div className="select-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <select name="department" value={form.department} onChange={handleDeptChange}>
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Doctor */}
          <div className="form-group">
            <label>Doctor</label>
            <div className="select-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <select name="doctorId" value={form.doctorId} onChange={handleChange}>
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          {/* Date */}
          <div className="form-group">
            <label>Appointment Date</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <input
                type="date"
                name="date"
                value={form.date}
                min={today}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Time Slot */}
          <div className="form-group">
            <label>Time Slot</label>
            <div className="select-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <select name="timeSlot" value={form.timeSlot} onChange={handleChange}>
                <option value="">Select Time</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        {form.doctorName && form.date && form.timeSlot && (
          <div className="booking-preview">
            <div className="preview-label">Appointment Summary</div>
            <div className="preview-row">
              <span>Doctor</span>
              <strong>{form.doctorName}</strong>
            </div>
            <div className="preview-row">
              <span>Department</span>
              <strong>{form.department}</strong>
            </div>
            <div className="preview-row">
              <span>Date</span>
              <strong>{new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </div>
            <div className="preview-row">
              <span>Time</span>
              <strong>{form.timeSlot}</strong>
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <span className="btn-spinner" /> : 'Confirm Booking'}
        </button>
      </form>
    </div>
  )
}
