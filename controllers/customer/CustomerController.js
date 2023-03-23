const Customer = require("../../models/CustomerModel")
const connectToDb = require('../../conn/connectMongoose')
const mongooseDisconnect = require('../../conn/disconnectMongoose')

exports.profileById = (req, res, next) => {
  const id = req.params._id
  const databaseName = req.userData.connectString
  // console.log("databaseName", databaseName)
  async function mongoConnect() {
    const connection = await connectToDb(databaseName)
      .then((result) => {
        Customer.findOne({ UserId: id })
          .then((profile) => {
            if (profile) {
              return res.send({
                status: 'success',
                msg: '',
                data: profile
              })
            }
            else {
              return res.send({
                status: 'success',
                msg: 'Profile not found',
                data: []
              })
            }
          })
      })
      .catch((err) => {
        return res.send({ err: err })
      })
  }
  mongoConnect()
}

exports.ProfileUpdate = (req, res, next) => {
  // console.log("req.body", req.body)
  const profileUpdate = {
    Party: req.body.name,
    // Email: req.body.Email,
  }
  const databaseName = req.userData.connectString
  async function mongoConnect() {
    const connection = await connectToDb(databaseName)
      .then((result) => {
        Customer.updateOne(req.body._id, profileUpdate)
          .then((profileUpdated) => {
            return res.send({
              status: 'success',
              msg: '',
              data: profileUpdated
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

exports.createCustomerProfile = (req, res, next) => {
  const userData = req.userData

  async function mongoConnect() {
    const connection = await connectToDb(databaseName)
      .then((result) => {
        Customer.updateOne(req.body._id, profileUpdate)
          .then((profileUpdated) => {
            return res.send({
              status: 'success',
              msg: '',
              data: profileUpdated
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