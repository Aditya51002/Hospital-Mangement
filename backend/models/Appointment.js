const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctorName: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: [
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'Oncology',
        'Dermatology',
        'Psychiatry',
        'General Medicine'
      ]
    },
    date: {
      type: String,
      required: [true, 'Date is required']
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
