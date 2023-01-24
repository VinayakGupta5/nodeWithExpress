const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
  pkId: {
    type: String,
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)