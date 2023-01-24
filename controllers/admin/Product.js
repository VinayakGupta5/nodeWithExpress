const Product = require('../../models/Product')
exports.postProduct = (req, res, next) => {
  Product.findOne({ pkId: req.body.pkId })
    .then(result => {
      if (result) {
        res.send({ message: "pkId already exist!" })
      }
      else {
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
    })

}

exports.postMultipleProducts = (req, res, next) => {
  var existingProd = []
  var notExistProd = []
  req.body.forEach(async (item) => {
    console.log("item", item)
    var existingDoc = await Product.findOne({ pkId: item.pkId })
    console.log("first", existingDoc)
    if (existingDoc) {
      existingProd.push(item)
    }
    else {
      notExistProd.push(item)
    }
  })
  Product.insertMany(notExistProd)
    .then(result => {
      res.send({
        existingProd: existingProd,
        successfullyAdded: notExistProd
      })
    })
    .catch(err => {
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

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ pkId: req.params.pkId })
    .then(result => {
      res.send(result)
    })
}