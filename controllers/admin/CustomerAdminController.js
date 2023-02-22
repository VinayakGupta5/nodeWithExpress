const connectToDb = require('../../conn/connectMongoose')
const mongooseDisconnect = require('../../conn/disconnectMongoose')
const Customer = require('../../models/CustomerModel')

exports.GetCustomers = (req, res, next) => {

  const databaseName = req.userData.connectString
  // console.log("database", databaseName)
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then((result) => {
        console.log("first")
        Customer.find()
          .then(customers => {
            console.log(customers)
            async function mongooseDiscon() {
              try {
                await mongooseDisconnect();
              } catch (err) {
                return res.send(err);
              }
              // console.log("now run")
            }
            mongooseDiscon();
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
            console.log(customers)
            async function mongooseDiscon() {
              try {
                await mongooseDisconnect();
              } catch (err) {
                return res.send(err);
              }
              // console.log("now run")
            }
            mongooseDiscon();
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
            console.log(customer)
            async function mongooseDiscon() {
              try {
                await mongooseDisconnect();
              } catch (err) {
                return res.send(err);
              }
              // console.log("now run")
            }
            mongooseDiscon();
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