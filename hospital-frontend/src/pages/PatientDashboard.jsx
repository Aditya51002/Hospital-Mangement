import React, { useState, useEffect } from 'react';
import { bookAppointment, getAppointments } from '../services/api';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Patient Dashboard</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="department" label="Department" fullWidth margin="normal" onChange={handleChange} required />
        <TextField name="doctorName" label="Doctor Name" fullWidth margin="normal" onChange={handleChange} required />
        <TextField name="date" type="date" label="Date" fullWidth margin="normal" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <TextField name="timeSlot" label="Time Slot" fullWidth margin="normal" onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Book Appointment</Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h6" sx={{ mt: 4 }}>Your Appointments</Typography>
      <List>
        {appointments.map((a) => (
          <ListItem key={a._id}>
            <ListItemText primary={`${a.date} ${a.timeSlot} with Dr. ${a.doctorName} - ${a.status}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default PatientDashboard;
