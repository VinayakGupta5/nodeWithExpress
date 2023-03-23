const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  PKID: {
    type: Number,
  },
  UserId: {
    type: String
  },
  Party: {
    type: String,
    required: true
  },
  Customer: {
    type: String,
  },
  Vendor: {
    type: String,
  },
  Address: {
    type: String,
  },
  District: {
    type: String,
  },
  Country: {
    type: String,
  },
  Pincode: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Mobile: {
    type: String,
  },
  Fax: {
    type: String,
  },
  Status: {
    type: String,
  },
  Email: {
    type: String,
  },
  Dob: {
    type: String,
  },
  PaymentMode: {
    type: String,
  },
  Contact: {
    type: String,

  },
  Station: {
    type: String,

  },
  State: {
    type: String,

  },
  Locality: {
    type: String,

  },
  Carrier: {
    type: String,

  },
  Account: {
    type: String,

  },
  Bank: {
    type: String,

  },
  Images: {
    type: String,
  },
  Selected: {
    type: String,
  },
  client: {
    type: Array
  },
  [process.env.b2b]: {
    type: Array,
  },
  [process.env.b2c]: {
    type: Array
  }
})

module.exports = mongoose.model('Customer', customerSchema)