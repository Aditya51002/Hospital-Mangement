import React, { useState, useEffect } from 'react';
import { bookAppointment, getAppointments } from '../services/api';

function PatientDashboard() {
  const [form, setForm] = useState({ department: '', doctorName: '', date: '', timeSlot: '' });
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments(token);
      setAppointments(res.data);
    } catch (err) {
      setError('Failed to fetch appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookAppointment({ ...form, patientName: user.name }, token);
      fetchAppointments();
    } catch (err) {
      setError('Booking failed');
    }
  };

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input name="department" placeholder="Department" onChange={handleChange} required />
        <input name="doctorName" placeholder="Doctor Name" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <input name="timeSlot" placeholder="Time Slot" onChange={handleChange} required />
        <button type="submit">Book Appointment</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <h3>Your Appointments</h3>
      <ul>
        {appointments.map((a) => (
          <li key={a._id}>{a.date} {a.timeSlot} with Dr. {a.doctorName} - {a.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientDashboard;
