const mongoose = require('mongoose');

const Schema = mongoose.Schema


const settingSchema = new Schema({
  auth_id:{
    type: 'string',
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  gstNo: {
    type: String,
  }


})

module.exports = mongoose.model('Setting', settingSchema)

