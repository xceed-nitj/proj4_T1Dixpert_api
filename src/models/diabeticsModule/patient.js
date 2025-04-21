const mongoose = require('mongoose')

// Define patient schema
const patientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: '12345', // Set default password
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
  },
  gender: {
    type: String,
  },
  father_name: {
    type: String,
  },
  mother_name: {
    type: String,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  DOD_of_T1D: {
    type: String,
  },
  family_history: {
    type: String,
  },
  economic_status: {
    type: String,
  },
  family_tree: {
    type: String,
  },
  immunization_history: {
    type: String,
  },
  treatment_history: {
    type: String,
  },
  referring_physician: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
})

// Create and export the patient model
const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient
