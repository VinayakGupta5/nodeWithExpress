const connectToDb = require('../../conn/connectMongoose');
const Users = require('../../models/AuthModel')
const Customer = require('../../models/CustomerModel')
const jwt = require('jsonwebtoken');
const mongooseDisconnect = require('../../conn/disconnectMongoose');
const { secretKey, encrypt } = require('../../Global/Global');
const bcrypt = require('bcryptjs')

const databaseName = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPass}@swindia1.17wlqvp.mongodb.net/SwilMain?retryWrites=true&w=majority`;

exports.websiteVerify = (req, res, next) => {
  const websiteName = req.body.websiteName
  console.log("websiterName", websiteName)

  async function mongoConnect() {
    const connection = await connectToDb(databaseName)
      .then((result) => {
        return Users.findOne({ websiteName: websiteName })
          .then(user => {
            if (user) {
              const userData = {
                _id: user._id,
                websiteName: user.websiteName,
                connectString: user.connectString
              }
              const userDataInString = JSON.stringify(userData);
              const tempSecreteKey = secretKey();
              const encryptData = encrypt(userDataInString, tempSecreteKey);
              const encData = {
                enc: encryptData
              }
              jwt.sign(encData, process.env.secretKey, { expiresIn: "300000s" }, (err, token) => {
                if (err) {
                  return res.send({ err: err })
                }
                else {
                  async function mongooseDiscon() {
                    try {
                      await mongooseDisconnect();
                    } catch (err) {
                      console.error('Error disconnecting from MongoDB:', err);
                      return;
                    }
                    // console.log("now run")
                  }
                  mongooseDiscon();
                  return res.send({
                    status: 'success',
                    message: "website verified",
                    data: {
                      token: token,
                      profileData: {
                        _id: userData._id,
                        websiteName: userData.websiteName
                      }
                    }
                  })
                }
              })
            }
            else {
              return res.send({ message: "Website not found!" })
            }
          })
      });
  }
  mongoConnect()
}

exports.Signup = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const name = req.body.name;
  const pass = req.body.pass;
  const confimPass = req.body.confirmPass;

  const databaseName = req.userData.connectString

  if (!email.includes('@')) {
    return res.send({ message: "Email is not valid!" })
  }
  if (!name) {
    return res.send({ message: "Name can not be empty!" })
  }
  if (!pass) {
    return res.send({ message: "Pass can not be empty!" })
  }
  if (pass !== confimPass) {
    return res.send({ message: "ConfirmPass is not match!" })
  }
  else {
    async function mongoConnect() {
      const connection = await connectToDb(databaseName)
        .then((result) => {
          Users.findOne({ email: email })
            .then(userByemail => {
              if (userByemail) {
                return res.send({
                  message: "Email already exist!",
                  user: {
                    _id: userByemail._id,
                    email: userByemail.email,
                    websiteName: userByemail.websiteName,
                    // connectString:userByemail.connectString
                  }
                })
              }
              else {
                bcrypt.hash(pass, 12)
                  .then(hashpass => {
                    const user = new Users({
                      email: email,
                      pass: hashpass,
                      name: name
                    })
                    user.save()
                      .then(userCreate => {
                        console.log("userCreate", userCreate.email)
                        const profile = new Customer({
                          Party: name,
                          UserId: userCreate._id,
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
                          Email: userCreate.email ,
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
                        profile.save()
                          .then(profile1 => {
                        async function mongooseDiscon() {
                          try {
                            await mongooseDisconnect();
                          } catch (err) {
                            console.error('Error disconnecting from MongoDB:', err);
                            return;
                          }
                          return res.send({
                            status: 'success',
                            message: "Successfully created",
                            data: {
                              _id: userCreate._id,
                              email: userCreate.email,
                              Party: profile1.Party
                            }
                          })
                        }
                        mongooseDiscon();
                        })
                      })
                      .catch(err => {
                        return res.send({ err: err })
                      })
                  })
              }
            })
        })
    }
    mongoConnect()
  }
}


exports.Login = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const pass = req.body.pass;

  const databaseName = req.userData.connectString

  if (!email.includes('@')) {
    return res.send({ message: "email is not valid!" })
  }
  if (!pass) {
    return res.send({ message: "password can not be empty!" })
  }
  else {
    async function mongoConnect() {
      const connection = await connectToDb(databaseName)
        .then((result) => {
          return Users.findOne({ email: email })
            .then(user => {
              if (user) {
                bcrypt.compare(pass, user.pass)
                  .then(doMatch => {
                    if (doMatch) {
                      const userData = {
                        _id: user._id,
                        email: user.email,
                        connectString: req.userData.connectString
                      }
                      const userDataInString = JSON.stringify(userData);
                      const tempSecreteKey = secretKey();
                      const encryptData = encrypt(userDataInString, tempSecreteKey);
                      const encData = {
                        enc: encryptData
                      }
                      jwt.sign(encData, process.env.secretKey, { expiresIn: "43200s" }, (err, token) => {
                        if (err) {
                          return res.send({ err: err })
                        }
                        else {
                          async function mongooseDiscon() {
                            try {
                              await mongooseDisconnect();
                            } catch (err) {
                              console.error('Error disconnecting from MongoDB:', err);
                              return;
                            }
                            // console.log("now run")
                          }
                          mongooseDiscon();
                          res.send({
                            status: 'success',
                            message: "Successfully Login",
                            data: {
                              token: token,
                              profileData: {
                                _id: userData._id,
                                email: userData.email
                              }
                            }
                          })
                        }
                      })
                    }
                    else {
                      return res.send({ message: "password does not match" })
                    }
                  })
              }
              else {
                return res.send({ message: "Email not found!" })
              }
            })
        });
    }
    mongoConnect()
  }
}