import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hospital Management
          </Typography>
          {!user && (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
          {user && user.role === 'patient' && (
            <Button color="inherit" component={Link} to="/patient">Dashboard</Button>
          )}
          {user && user.role === 'doctor' && (
            <Button color="inherit" component={Link} to="/doctor">Dashboard</Button>
          )}
          {user && (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
