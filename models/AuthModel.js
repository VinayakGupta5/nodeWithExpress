const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  websiteName: {
    type: String,
    required: true
  },
  connectString: {
    type: String
  }
})

module.exports = mongoose.model('Users', userSchema)