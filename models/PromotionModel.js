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
        required: true
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
    // promotionType: {
    //     type: String,
    // }

})

module.exports = mongoose.model('Promotion', promotionSchema)