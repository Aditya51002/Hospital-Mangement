const Appointment = require('../models/Appointment');

// @desc   Book appointment (patient only)
// @route  POST /api/appointments
// @access Private (patient)
const bookAppointment = async (req, res) => {
  try {
    const { doctorName, department, date, timeSlot } = req.body;

    if (!doctorName || !department || !date || !timeSlot) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const appointment = await Appointment.create({
      patientName: req.user.name,
      patientId: req.user._id,
      doctorName,
      department,
      date,
      timeSlot
    });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Get appointments
// @route  GET /api/appointments
// @access Private (patient sees own | doctor sees all)
const getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'doctor') {
      // Doctor sees all appointments assigned to them by doctor name
      appointments = await Appointment.find({ doctorName: req.user.name }).sort({
        createdAt: -1
      });
    } else {
      // Patient sees only their own appointments
      appointments = await Appointment.find({ patientId: req.user._id }).sort({
        createdAt: -1
      });
    }

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Get all appointments (for doctor dashboard - any doctor)
// @route  GET /api/appointments/all
// @access Private (doctor)
const getAllAppointments = async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Update appointment status (doctor only)
// @route  PUT /api/appointments/:id
// @access Private (doctor)
const updateAppointmentStatus = async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Only doctors can update appointment status' });
    }

    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: `Appointment ${status}`, appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  getAllAppointments,
  updateAppointmentStatus
};
