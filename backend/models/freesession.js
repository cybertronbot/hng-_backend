const mongoose = require('mongoose')

const Schema = mongoose.Schema

const freesessionSchema = new Schema({
    sessionName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attendeesLimit: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
 
  relevantTopics: {
    type: String,
    required: true
  },
  
 
}, { timestamps: true })

module.exports = mongoose.model('FreeSession', freesessionSchema)