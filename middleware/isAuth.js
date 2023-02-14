const jwt = require('jsonwebtoken')
const { decrypt, secretKey } = require('../Global/Global')

module.exports = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader === 'undefined') {
    return res.send({ message: "please attach token!" })
  }
  else {
    const token = bearerHeader.split(" ")[1]
    if (token) {
      jwt.verify(token, process.env.secretKey, (err, userData) => {
        if (err) {
          return res.send({ err: err })
        }
        else {
          const tempSecretKey = secretKey()
          const dcryptData = decrypt(userData.enc, tempSecretKey)
          req.userData = JSON.parse(dcryptData)
          console.log("req.userData", req.userData)
          next()
        }
      })
    }
  }
}