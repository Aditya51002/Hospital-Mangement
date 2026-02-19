const express = require('express');
const router = express.Router();
const { bookAppointment,getAppointments, getAllAppointments,updateAppointmentStatus} = require('../controllers/appointmentController');
const { protect, doctorOnly, patientOnly } = require('../middleware/auth');
router.post('/', protect, patientOnly, bookAppointment);
router.get('/', protect, getAppointments);
router.get('/all', protect, doctorOnly, getAllAppointments);
router.put('/:id', protect, doctorOnly, updateAppointmentStatus);

module.exports = router;
