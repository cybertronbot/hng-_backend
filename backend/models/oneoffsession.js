const mongoose = require('mongoose')

const Schema = mongoose.Schema

const oneoffsessionSchema = new Schema({
    sessionName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
 
  relevantTopics: {
    type: String,
    required: true
  },
  sessionUrl: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  sessionType: {
    type: String,
    enum: ["Private", "Public"],
    required: true
  }
 
  
 
}, { timestamps: true })

module.exports = mongoose.model('OneOffSession', oneoffsessionSchema)