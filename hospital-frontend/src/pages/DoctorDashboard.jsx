import React, { useState, useEffect } from 'react';
import { getAppointments, updateAppointment } from '../services/api';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

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

  const handleStatus = async (id, status) => {
    try {
      await updateAppointment(id, status, token);
      fetchAppointments();
    } catch (err) {
      setError('Update failed');
    }
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <h3>Assigned Appointments</h3>
      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {a.date} {a.timeSlot} with {a.patientName} - {a.status}
            {a.status === 'pending' && (
              <>
                <button onClick={() => handleStatus(a._id, 'approved')}>Approve</button>
                <button onClick={() => handleStatus(a._id, 'rejected')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
