const mongoose = require('mongoose')

const Schema = mongoose.Schema

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    PriceDiscount: {
        type: Number
    },
    PercentageDiscount: {
        type: Number
    },
    promotionType: {
        type: String,
    }

})

module.exports = mongoose.model('Promotion', promotionSchema)