import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectRole.css';

const SelectRole = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === 'patient') {
      navigate('/login?role=patient');
    } else if (role === 'doctor') {
      navigate('/login?role=doctor');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <div className="auth-container">
        <div className="auth-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="brand-name">HealthConnect</span>
        </div>

        <div className="auth-card select-role-card">
          <div className="auth-card-header">
            <h1>Select Your Role</h1>
            <p>Choose how you want to access HealthConnect</p>
          </div>
          <div className="role-cards">
            <div className="role-card" onClick={() => handleSelect('patient')}>
              <div className="role-icon patient">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>Patient</h3>
              <p>Book appointments and manage your health records.</p>
            </div>
            <div className="role-card" onClick={() => handleSelect('doctor')}>
              <div className="role-icon doctor">
                {/* Injection/Syringe SVG icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 5l-7 7" />
                  <path d="M8 8l8 8" />
                  <path d="M21 3l-2 2" />
                  <path d="M3 21l6-6" />
                  <path d="M16 16l2 2" />
                  <path d="M3 21l3-3" />
                </svg>
              </div>
              <h3>Doctor</h3>
              <p>View appointments and manage your patients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
