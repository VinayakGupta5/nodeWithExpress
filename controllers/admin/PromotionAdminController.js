const Promotion = require('../../models/PromotionModel')
const connectToDb = require('../../conn/connectMongoose')
const mongooseDisconnect = require('../../conn/disconnectMongoose')

exports.CreatePromotion = (req, res, next) => {

    const title = req.body.title
    const description = req.body.description
    const imageData = req.body.imageData
    const contentType = req.body.contentType
    const percentageDiscount = req.body.percentageDiscount
    const priceDiscount = req.body.priceDiscount
    var startDate = ''
    var endDate = ''

    if (!(req.body.startDate === '')) {
        // const startDateParts = req.body.startDate.split('-');
        // startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
        startDate = new Date(req.body.startDate);
    }
    if (!(req.body.endDate === '')) {
        // const endDateParts = req.body.endDate.split('-');
        // console.log("endDateParts", endDateParts)
        // endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);
        endDate = new Date(req.body.endDate);
        console.log("endDate", endDate)
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
        percentageDiscount: percentageDiscount
    })

    async function mongoConnect() {
        await connectToDb(databaseName)
            .then((result) => {
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
    const updatePromotion = req.body
    const _id = req.params._id
    console.log("updatePromotion", updatePromotion)
    console.log("_id", _id)
    const databaseName = req.userData.connectString
    async function mongoConnect() {
        await connectToDb(databaseName)
            .then((dbResult) => {
                Promotion.findByIdAndUpdate(_id, updatePromotion)
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