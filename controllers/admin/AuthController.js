const bcrypt = require('bcryptjs')
const Users = require('../../models/AuthModel')
exports.Login = (req, res, next) => {

}
exports.Signup = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const confimPass = req.body.confimPass;
  const websiteName = req.body.websiteName;
  const emailValidation = email.includes('@')
  if (!emailValidation) {
    res.send({ message: "email is not valid!" })
  }
  if (!pass) {
    res.send({ message: "pass can not be empty!" })
  }
  if (pass !== confimPass) {
    res.send({ message: "ConfirmPass is not match!" })
  }
  if (!websiteName) {
    res.send({ message: "website Name can not be empty!" })
  }
  else {
    console.log(email, pass, confimPass, websiteName)
    Users.findOne({ email: email })
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
                websiteName: websiteName
              })
              user.save()
                .then(userCreate => {
                  res.send({ status: "successfully created", data: userCreate })
                })
                .catch(err => {
                  res.send({ err: err })
                })
            })
        }
      })
  }


}