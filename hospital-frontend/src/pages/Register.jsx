import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" fullWidth margin="normal" onChange={handleChange} required />
        <TextField name="email" type="email" label="Email" fullWidth margin="normal" onChange={handleChange} required />
        <TextField name="password" type="password" label="Password" fullWidth margin="normal" onChange={handleChange} required />
        <TextField select name="role" label="Role" fullWidth margin="normal" onChange={handleChange} value={form.role}>
          <MenuItem value="patient">Patient</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default Register;
