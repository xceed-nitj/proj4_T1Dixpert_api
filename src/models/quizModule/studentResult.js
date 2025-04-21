const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentResultSchema = new Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  totalCorrect: {
    type: Number,
    required: true,
  },
  totalWrong: {
    type: Number,
    required: true,
  },
  totalUnattempt: {
    type: Number,
    required: true,
  },
});

// Export the model
const StudentResult = mongoose.model('qz-studentres', studentResultSchema);
module.exports = StudentResult;