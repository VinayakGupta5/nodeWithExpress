const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const connectToDb = require('../../conn/connectMongoose');
const { encrypt, secretKey } = require('../../Global/Global');
const Users = require('../../models/AuthModel')
const mongooseDisconnect = require('../../conn/disconnectMongoose')
const mongoose = require('mongoose')


const databaseName = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPass}@swindia1.17wlqvp.mongodb.net/SwilMain?retryWrites=true&w=majority`;



exports.Signup = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const pass = req.body.pass;
  const confimPass = req.body.confimPass;
  const websiteName = req.body.websiteName.toLowerCase();
  const databaseCreateName = websiteName.split('.')[1]

  if (!email.includes('@')) {
    return res.send({ message: "email is not valid!" })
  }
  if (!pass) {
    return res.send({ message: "pass can not be empty!" })
  }
  if (pass !== confimPass) {
    return res.send({ message: "ConfirmPass is not match!" })
  }
  if (!websiteName) {
    return res.send({ message: "website Name can not be empty!" })
  }
  else {
    if (!websiteName.includes("www.") || !websiteName.includes(".com")) {
      return res.send({ message: "website Name should be written fully ex:- www.example.com" })
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
                  Users.findOne({ websiteName: websiteName })
                    .then(userByWeb => {
                      if (userByWeb) {
                        return res.send({
                          message: "Website Name already exist!",
                          user: {
                            _id: userByWeb._id,
                            email: userByWeb.email,
                            websiteName: userByWeb.websiteName
                          }
                        })
                      }
                      else {
                        bcrypt.hash(pass, 12)
                          .then(hashpass => {
                            const user = new Users({
                              email: email,
                              pass: hashpass,
                              websiteName: websiteName,
                              connectString: `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPass}@swindia1.17wlqvp.mongodb.net/${databaseCreateName}?retryWrites=true&w=majority`
                            })
                            user.save()
                              .then(userCreate => {
                                return res.send({
                                  status: 'success',
                                  message: "Successfully created",
                                  data: {
                                    _id: userCreate._id,
                                    email: userCreate.email,
                                    websiteName: userCreate.websiteName
                                  }
                                })
                              })
                              .catch(err => {
                                res.send({ err: err })
                              })
                          })
                      }
                    })
                }
              })
          })
      }
      mongoConnect()
    }
  }
}


exports.Login = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const pass = req.body.pass;
  const roleType = req.body.roleType

  if (!email.includes('@')) {
    return res.send({ message: "email is not valid!" })
  }
  if (!pass) {
    return res.send({ message: "password can not be empty!" })
  }
  if (!roleType) {
    return res.send({ message: "roleType can not be empty!" })
  }

  async function mongoConnect() {
    const connection = await connectToDb(databaseName)
      .then((result) => {
        Users.findOne({ email: email })
          .then(user => {
            if (user) {
              bcrypt.compare(pass, user.pass)
                .then(doMatch => {
                  const userData = {
                    _id: user._id,
                    email: user.email,
                    roleType: roleType,
                    connectString: user.connectString
                  }
                  const userDataInString = JSON.stringify(userData);
                  const tempSecreteKey = secretKey();
                  const encryptData = encrypt(userDataInString, tempSecreteKey);
                  const encData = {
                    enc: encryptData
                  }

                  if (doMatch) {
                    jwt.sign(encData, process.env.secretKey, { expiresIn: "43200s" }, (err, token) => {
                      if (err) {
                        return res.send({ err: err })
                      }
                      else {
                        return res.send({
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

exports.websiteVerify = (req, res, next) => {
  const websiteName = req.body.websiteName

  console.log("websiteName", websiteName)

  async function mongoConnect() {
    const connection = await connectToDb(databaseName)
      .then((result) => {

        const date = Date.now()
        console.log("date1", date)
        setTimeout(() => {
          console.log("date2", date)
       

        Users.findOne({ websiteName: websiteName })
          .then((result) => {
            console.log("result", result)

            const userData = {
              _id: result._id,
              email: result.email,
              websiteName: result.websiteName,
              connectString: result.connectString
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
                return res.send({
                  status: 'success',
                  message: "Successfully verify",
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
          })
          .catch((result) => {
            return res.send({
              status: 'failed',
              msg: '',
              data: {
                _id: result._id,
                email: result.email,
                websiteName: result.websiteName
              }
            })
          })

        }, 300000);
      })
  }

  mongoConnect()
}
