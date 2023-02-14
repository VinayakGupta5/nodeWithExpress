const Customer = require("../../models/CustomerModel")
const connectToDb = require('../../conn/connectMongoose')
const mongooseDisconnect = require('../../conn/disconnectMongoose')

exports.profileById = (req, res, next) => {
  const id = req.params._id
  const databaseName = req.userData.connectString
  console.log("databaseName", databaseName)
  async function mongoConnect() {
    const connection = await connectToDb(databaseName)
      .then((result) => {
        Customer.findOne({ UserId: id })
          .then((profile) => {
            async function mongooseDiscon() {
              try {
                await mongooseDisconnect();
              } catch (err) {
                return res.send(err);
              }
              // console.log("now run")
            }
            mongooseDiscon();
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
        res.send({ err: err })
      })
  }
  mongoConnect()
}

exports.ProfileUpdate = (req, res, next) => {
  const profile = new Customer({
    Party: req.body.name,
    PKID: null,
    Customer: "",
    Vendor: "",
    Address: "",
    District: "",
    Country: "",
    Pincode: "",
    Phone: "",
    Mobile: "",
    Fax: "",
    Status: "",
    Email: req.body.email ,
    Dob: "",
    PaymentMode: "",
    Contact: "",
    Station: "",
    State: "",
    Locality: "",
    Carrier: "",
    Account: "",
    Bank: "",
    No: "",
    Images: "",
    ImageStatus: "",
    UserName: ""
  })
} 