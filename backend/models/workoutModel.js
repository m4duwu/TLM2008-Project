const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  importance:
  {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)