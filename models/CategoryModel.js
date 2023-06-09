const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
})

module.exports = mongoose.model('Category', categorySchema);