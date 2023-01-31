const Product = require('../../models/Product')
exports.postProduct = (req, res, next) => {
  Product.findOne({ PKID: req.body.PKID })
    .then(result => {
      if (result) {
        res.send({ message: "This product is already exist as per PKID!" })
      }
      else {
        const product = new Product({
          PKID: req.body.PKID,
          NameToDisplay: req.body.NameToDisplay,
          Brand: req.body.Brand,
          Strength: req.body.Strength,
          Unit1: req.body.Unit1,
          ProdConv1: req.body.ProdConv1,
          Unit2: req.body.Unit2,
          SellLoose: req.body.SellLoose,
          ProdConv2: req.body.ProdConv2,
          Unit3: req.body.Unit3,
          IsExpiryApplied: req.body.IsExpiryApplied,
          IsMfgDateApplied: req.body.IsMfgDateApplied,
          IsUniqueIDapplied: req.body.IsUniqueIDapplied,
          IsColorApplied: req.body.IsColorApplied,
          IsBarCodeApplied: req.body.IsBarCodeApplied,
          Description: req.body.Description,
          FkprodCatgId: req.body.FkprodCatgId,
          MRP: req.body.MRP,
          Barcode: req.body.Barcode,
          Weight: req.body.Weight,
          Height: req.body.Height,
          Width: req.body.Width,
          Length: req.body.Length,
          WeightUnit: req.body.WeightUnit,
          HeightUnit: req.body.HeightUnit,
          Status: req.body.Status,
          Image: req.body.Image,
          BestBefore: req.body.BestBefore,
          BestBeforeUnit: req.body.BestBeforeUnit,
          Skudefinition: req.body.Skudefinition,
          HSNCode: req.body.HSNCode,
          MfgGroupName: req.body.MfgGroupName,
          GroupName: req.body.GroupName,
          GroupAlias: req.body.GroupAlias,
          MfgGroupAlias: req.body.MfgGroupAlias,
          Category: req.body.Category,
          CategoryGroup: req.body.CategoryGroup,
          CatgSKU: req.body.CatgSKU,
          Generic1: req.body.Generic1,
          Generic2: req.body.Generic2,
          BoxSize: req.body.BoxSize,
          Schedule: req.body.Schedule,
          Remarks: req.body.Remarks,
          Images: req.body.Images,
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
  console.log("2First")
  var existingDoc = []
  var notExistDoc = []
  const postsData = req.body

  const Ids = postsData.map((post) => {
    return post.PKID
  })

  Product.find({
    'PKID': {
      $in: Ids
    }
  }, function (err, existingDocFounded) {
    console.log("docs", existingDocFounded);
    existingDoc = existingDocFounded
    postsData.forEach((post) => {
      var findDoc = existingDocFounded.find((doc) => doc.PKID === post.PKID)
      if (!findDoc) {
        notExistDoc.push(post)
      }
    })

    Product.insertMany(notExistDoc)
      .then(result => {
        res.send({
          existingProd: existingDoc,
          successfullyAdded: result
        })
      })
      .catch(err => {
        console.log(err)
      })


  });

}

exports.getOneProductById = (req, res, next) => {
  Product.find({PKID: req.params.PKID})
  .then(product => {
    res.send(product)
    console.log("Product by Id",product)
  })
}

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then(producdts => {
      res.send(products)
    })
    .catch(err => {
      res.send(err)
    })
}

exports.deleteProduct = (req, res, next) => {
  console.log("req.params.PKID", req.params)
  Product.deleteOne({ PKID: req.params.PKID })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
    })
}