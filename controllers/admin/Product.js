const Product = require('../../models/Product')
exports.postProduct = (req, res, next) => {
  console.log("req.body", req.body)
  const product = new Product({
    pkId: req.body.pkId,
    name: req.body.name
  })
  product.save()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
}

exports.postMultipleProducts = (req, res, next) => {
  Product.insertMany(req.body).then((result => {
    res.send(result)
  }))
  .catch(err=>{
    console.log(err)
  })
}

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.send(products)
    })
    .catch(err => {
      res.send(err)
    })
}