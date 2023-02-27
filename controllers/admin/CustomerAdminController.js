const connectToDb = require('../../conn/connectMongoose')
const mongooseDisconnect = require('../../conn/disconnectMongoose')
const Customer = require('../../models/CustomerModel')

exports.GetCustomers = (req, res, next) => {

  const databaseName = req.userData.connectString
  console.log("databaseName",databaseName)

  async function mongoConnect() {
    await connectToDb(databaseName)
      .then((result) => {
        Customer.find()
          .then(customers => {
            console.log("CUSTOMERS", customers)
            return res.send({
              status: 'success',
              message: '',
              data: customers 
            })
          })
          .catch((err) => {
            return res.send({
              status: 'success',
              message: '',
              data: err
            })
          })
      })
  }
  mongoConnect()
}

exports.GetCustomerById = (req, res, next) => {
  const id = req.params._id
  async function mongoConnect() {
    await connectToDb(req.userData.connectString)
      .then((result) => {
        Customer.findById(id)
          .then(customers => {
            return res.send({
              status: 'success',
              message: '',
              data: customers
            })
          })
          .catch((err) => {
            return res.send({
              status: 'error',
              message: '',
              data: err
            })
          })
      })
  }
  mongoConnect()
}

exports.CreateCustomer = (req, res, next) => {
  const customer = req.body
  async function mongoConnect() {
    await connectToDb(req.userData.connectString)
     .then((result) => {
        Customer.create(customer)
         .then(customer => {
            return res.send({
              status:'success',
              message: '',
              data: customer
            })
          })
         .catch((err) => {
            return res.send({
              status: 'error',
              message: '',
              data: err
            })
          })
      })
  }
  mongoConnect()
}

exports.UpdateCustomer = (req, res, next) => {
  const id = req.params._id
  const customer = req.body
  async function mongoConnect() {
    await connectToDb(req.userData.connectString)
    .then((result) => {
        Customer.findByIdAndUpdate(id, customer)
        .then(customer => {
            return res.send({
              status:'success',
              message: '',
              data: customer
            })
          })
        .catch((err) => {
            return res.send({
              status: 'error',
              message: '',
              data: err
            })
          })
      })
  }
  mongoConnect()
}