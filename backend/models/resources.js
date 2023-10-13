const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resourcesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    required: true
  },
  reviews: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Resources', resourcesSchema)