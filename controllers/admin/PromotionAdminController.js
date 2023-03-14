const Promotion = require('../../models/PromotionModel')
const connectToDb = require('../../conn/connectMongoose')
const mongooseDisconnect = require('../../conn/disconnectMongoose')

exports.CreatePromotion = (req, res, next) => {

    const title = req.body.title
    const description = req.body.description
    const imageData = req.body.imageData
    const contentType = req.body.contentType

    // const startDateParts = req.body.startDate.split('-');
    // const startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
    // const endDateParts = req.body.endDate.split('-');
    // const endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

    const databaseName = req.userData.connectString

    const promotion = new Promotion({
        title: title,
        description: description,
        imageData: Buffer.from(imageData, 'base64'),
        contentType: contentType
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