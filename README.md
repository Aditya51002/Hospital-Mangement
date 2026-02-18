# MediCare - Hospital Management System

A full-stack MERN Medical Appointment Management System with Role-Based Access Control.

## Tech Stack
- **Frontend**: React 18 + Vite + React Router + Axios
- **Backend**: Node.js + Express
- **Database**: MongoDB (mongodb://localhost:27017/hospital)
- **Auth**: JWT + bcryptjs

## Getting Started

### 1. Start MongoDB on localhost:27017

### 2. Backend
```bash
cd backend
npm install
npm run dev      # http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
```

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/appointments   (Patient only)
- GET  /api/appointments   (Patient: own | Doctor: theirs)
- GET  /api/appointments/all (Doctor only)
- PUT  /api/appointments/:id (Doctor only)

## Roles
- Patient: Register, Login, Book appointments, View own appointments
- Doctor: Login, View assigned appointments, Approve or Reject
