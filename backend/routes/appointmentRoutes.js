const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getAppointments,
  getAllAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');
const { protect, doctorOnly, patientOnly } = require('../middleware/auth');

// POST /api/appointments → Patient only
router.post('/', protect, patientOnly, bookAppointment);

// GET /api/appointments → Patient & Doctor (filtered by role)
router.get('/', protect, getAppointments);

// GET /api/appointments/all → Doctor sees all appointments
router.get('/all', protect, doctorOnly, getAllAppointments);

// PUT /api/appointments/:id → Doctor only
router.put('/:id', protect, doctorOnly, updateAppointmentStatus);

module.exports = router;
