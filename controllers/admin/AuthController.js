const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const connectToDb = require('../../conn/connFunction');
const { encrypt, decrypt, secretKey } = require('../../Global/Global');
const Users = require('../../models/AuthModel')


exports.Login = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const emailValidation = email.includes('@')
  if (!emailValidation) {
    return res.send({ message: "email is not valid!" })
  }
  if (!pass) {
    return res.send({ message: "password can not be empty!" })
  }
  else {
    const databaseName = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPass}@swindia1.17wlqvp.mongodb.net/SwilMain?retryWrites=true&w=majority`;
    (async () => {
      const connection = await connectToDb(databaseName)
        .then(result => {
          return Users.findOne({ email: email })
            .then(user => {
              if (user) {
                bcrypt.compare(pass, user.pass)
                  .then(doMatch => {
                    const userData = {
                      _id: user._id,
                      email: user.email,
                      connectString: user.connectString
                    }
                    const userDataInString = JSON.stringify(userData)
                    const tempSecreteKey = secretKey()
                    const encryptData = encrypt(userDataInString, tempSecreteKey)
                    const encData = {
                      enc: encryptData
                    }
                    // console.log("encryptData", encryptData)
                    if (doMatch) {
                      jwt.sign(encData, process.env.secretKey, { expiresIn: "3000s" }, (err, token) => {
                        if (err) {
                          return res.send({ err: err })
                        }
                        else {
                          return res.send({
                            token: token,
                            profileData: {
                              _id: userData._id,
                              email: userData.email
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
    })();

  }
}

exports.Signup = (req, res, next) => {
  const email = req.body.email;
  const databaseName = email.split('@')[0]
  const pass = req.body.pass;
  const confimPass = req.body.confimPass;
  const websiteName = req.body.websiteName;
  const emailValidation = email.includes('@')
  if (!emailValidation) {
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
    return Users.findOne({ email: email })
      .then(user => {
        if (user) {
          res.send({ message: "User already exist!" })
        }
        else {
          bcrypt.hash(pass, 12)
            .then(hashpass => {
              const user = new Users({
                email: email,
                pass: hashpass,
                websiteName: websiteName,
                connectString: `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPass}@swindia1.17wlqvp.mongodb.net/${databaseName}?retryWrites=true&w=majority`
              })
              user.save()
                .then(userCreate => {
                  res.send({
                    status: "successfully created",
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
}
