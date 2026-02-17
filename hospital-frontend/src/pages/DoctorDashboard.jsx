import React, { useState, useEffect } from 'react';
import { getAppointments, updateAppointment } from '../services/api';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h6" sx={{ mt: 4 }}>Assigned Appointments</Typography>
      <List>
        {appointments.map((a) => (
          <ListItem key={a._id}>
            <ListItemText primary={`${a.date} ${a.timeSlot} with ${a.patientName} - ${a.status}`} />
            {a.status === 'pending' && (
              <>
                <Button onClick={() => handleStatus(a._id, 'approved')} variant="contained" color="success" sx={{ mr: 1 }}>Approve</Button>
                <Button onClick={() => handleStatus(a._id, 'rejected')} variant="contained" color="error">Reject</Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default DoctorDashboard;
