const mongoose = require('mongoose')

const Schema = mongoose.Schema

const promotionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageData: {
        type: Buffer
    },
    contentType: {
        type: String
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    priceDiscount: {
        type: Number
    },
    percentageDiscount: {
        type: Number
    },
    category: {
        type: Array
    },
    // promotionType: {
    //     type: String,
    // }

})

module.exports = mongoose.model('Promotion', promotionSchema)