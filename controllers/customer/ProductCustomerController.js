const Product = require('../../models/ProductModel')
const connectToDb = require("../../conn/connectMongoose")

exports.GetProducts = (req,res,next) => {
 
  var page = req.query.page
  var items_per_page = req.query.noOfItems
  if (page === 'undefined') {
    page = 1
  }
  if (items_per_page === 'undefined') {
    items_per_page = 20
  }

  async function mongoConnect() {
    await connectToDb(req.userData.connectString)
      .then((result) => {
        Product.find({active:true})
          .skip((page - 1) * items_per_page)
          .limit(items_per_page)
          .then(products => {
            return res.send({
              status: 'success',
              message: "",
              data: products
            })
          })
          .catch(err => {
            return res.send(err)
          })
      });
  }
  mongoConnect();
}