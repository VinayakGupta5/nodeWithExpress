const jwt = require('jsonwebtoken')
const { secretKey } = require('../controllers/admin/AuthController')

module.exports = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader === 'undefined') {
    return res.send({ message: "please attach token!" })
  }
  else {
    const token = bearerHeader.split(" ")[1]
    if (token) {
      jwt.verify(token, secretKey, (err, userData) => {
        if (err) {
          return res.send({ err: err })
        }
        else {
          req.userData = userData
          next()
          // return res.send({ data: userData })
        }
      })
    }
  }
}