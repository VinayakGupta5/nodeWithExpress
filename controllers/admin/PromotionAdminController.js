const Promotion = require('../../models/PromotionModel')
const connectToDb = require('../../conn/connectMongoose')
const mongooseDisconnect = require('../../conn/disconnectMongoose')

exports.CreatePromotion = (req, res, next) => {

    const title = req.body.title;
    const description = req.body.description;
    let imageData = req.body.imageData;
    const contentType = req.body.contentType;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    const percentageDiscount = req.body.percentageDiscount;
    const priceDiscount = req.body.priceDiscount;
    const category = req.body.category


    if (title === '' || typeof title === 'undefined') {
        return res.send({
            status: 'failed',
            msg: 'title should not be empty',
            data: []
        })
    }
    if (description === '' || typeof description === 'undefined') {
        return res.send({
            status: 'failed',
            msg: 'Description should not be empty',
            data: []
        })
    }
    if (priceDiscount === null || typeof priceDiscount === 'undefined') {
        return res.send({
            status: 'failed',
            msg: 'PriceDiscount should not be empty',
            data: []
        })
    }

    if (startDate === null || typeof startDate === 'undefined') {
        return res.send({
            status: 'failed',
            msg: 'startDate should not be empty',
            data: []
        })
    }
    else {
        startDate = new Date(req.body.startDate);
    }
    if (endDate === null || typeof endDate === 'undefined') {
        // const endDateParts = req.body.endDate.split('-');
        // console.log("endDateParts", endDateParts)
        // endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);
        return res.send({
            status: 'failed',
            msg: 'endDate should not be empty',
            data: []
        })
    }
    else {
        endDate = new Date(req.body.endDate);
    }

    if (startDate !== null && endDate !== null) {
        if (startDate > endDate) {
            return res.send({
                status: 'failed',
                msg: 'endDate should not be less than startDate',
                data: []
            })
        }
    }


    const databaseName = req.userData.connectString

    const promotion = new Promotion({
        title: title,
        description: description,
        imageData: Buffer.from(imageData, 'base64'),
        contentType: contentType,
        startDate: startDate,
        endDate: endDate,
        priceDiscount: priceDiscount,
        percentageDiscount: percentageDiscount,
        category: category
    })

    async function mongoConnect() {
        await connectToDb(databaseName)
            .then((result) => {
                Promotion.findOne({ title: title })
                    .then((findPromotion) => {
                        if (!findPromotion) {
                            promotion.save()
                                .then(prom => {
                                    return res.send({
                                        status: 'success',
                                        msg: '',
                                        data: prom
                                    })
                                })
                                .catch(err => {
                                    return res.send({
                                        status: 'failed',
                                        msg: '',
                                        data: err
                                    })
                                })
                        }
                        else {
                            return res.send({
                                status: 'failed',
                                msg: 'Title should not be same',
                                data: []
                            })
                        }
                    })

            })
    }

    mongoConnect()
}

exports.GetAllPromotions = (req, res, body) => {

    const databaseName = req.userData.connectString

    async function mongoConnect() {
        await connectToDb(databaseName)
            .then((result) => {
                Promotion.find()
                    .then(promotions => {
                        return res.send(promotions)
                    })
                    .catch(err => {
                        return res.send(err)
                    })
            })
    }
    mongoConnect()
}


exports.GetPromotionById = (req, res, next) => {
    const id = req.params._id

    const databaseName = req.userData.connectString

    async function mongoConnect() {
        await connectToDb(databaseName)
            .then((result) => {
                Promotion.findById(id)
                    .then(promotions => {
                        return res.send(promotions)
                    })
                    .catch(err => {
                        return res.send(err)
                    })
            })
    }
    mongoConnect()
}

exports.updatePromotion = (req, res, next) => {

    console.log("req.body", req.body)

    const _id = req.body._id;
    const title = req.body.title;
    console.log("title", title)
    const description = req.body.description;
    let imageData = req.body.imageData;
    const contentType = req.body.contentType;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    const percentageDiscount = req.body.percentageDiscount;
    const priceDiscount = req.body.priceDiscount;


    if (title === '' || typeof title === 'undefined') {
        return res.send({
            status: 'failed',
            msg: 'title should not be empty',
            data: []
        })
    }
    if (description === '' || typeof description === 'undefined') {
        return res.send({
            status: 'failed',
            msg: 'Description should not be empty',
            data: []
        })
    }
    if (priceDiscount === null || typeof priceDiscount === 'undefined') {
        return res.send({
            status: 'failed',
            msg: 'PriceDiscount should not be empty',
            data: []
        })
    }

    if (startDate === null || typeof startDate === 'undefined') {
        return res.send({
            status: 'failed',
            msg: 'startDate should not be empty',
            data: []
        })
    }
    else {
        startDate = new Date(req.body.startDate);
    }
    if (endDate === null || typeof endDate === 'undefined') {
        // const endDateParts = req.body.endDate.split('-');
        // console.log("endDateParts", endDateParts)
        // endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);
        return res.send({
            status: 'failed',
            msg: 'endDate should not be empty',
            data: []
        })
    }
    else {
        endDate = new Date(req.body.endDate);
    }

    if (startDate !== null && endDate !== null) {
        if (startDate > endDate) {
            return res.send({
                status: 'failed',
                msg: 'endDate should not be less than startDate',
                data: []
            })
        }
    }

    const updatePromotion = {
        title: title,
        description: description,
        imageData: Buffer.from(imageData, 'base64'),
        contentType: contentType,
        startDate: startDate,
        endDate: endDate,
        priceDiscount: priceDiscount,
        percentageDiscount: percentageDiscount
    }

    const databaseName = req.userData.connectString
    async function mongoConnect() {
        await connectToDb(databaseName)
            .then((dbResult) => {
                Promotion.findOneAndUpdate({ _id: _id }, updatePromotion)
                    .then((updateResult) => {
                        return res.send({
                            status: 'success',
                            msg: 'Update Successfully',
                            data: updateResult
                        })
                    })
                    .catch((err) => {
                        return res.send({
                            status: 'failed',
                            msg: '',
                            data: err
                        })
                    })
            })
    }
    mongoConnect()
}

exports.deletePromotion = (req, res, next) => {
    const id = req.params._id
    const databaseName = req.userData.connectString

    async function mongoConnect() {
        await connectToDb(databaseName)
            .then((result) => {
                Promotion.findByIdAndDelete(id)
                    .then(deletePromotion => {
                        return res.send(
                            {
                                status: 'success',
                                msg: '',
                                data: deletePromotion
                            }
                        )
                    })
                    .catch(err => {
                        return res.send({
                            status: 'failed',
                            msg: '',
                            data: err
                        })
                    })
            })
    }
    mongoConnect()

}