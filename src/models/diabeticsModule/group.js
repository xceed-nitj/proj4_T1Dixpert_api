
const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description:{
    type: String,
    required: true
  }
  ,
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    }
  ],
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user'
//   }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
