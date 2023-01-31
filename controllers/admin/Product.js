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
  Product.find({ PKID: req.params.PKID })
    .then(product => {
      res.send(product)
      console.log("Product by Id", product)
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

exports.updateProduct = (req, res, next) => {
  Product.find({ PKID: req.params.PKID })
    .then(product => {
      product.PKID = req.body.PKID,
        product.NameToDisplay = req.body.NameToDisplay,
        product.Brand = req.body.Brand,
        product.Strength = req.body.Strength,
        product.Unit1 = req.body.Unit1,
        product.ProdConv1 = req.body.ProdConv1,
        product.Unit2 = req.body.Unit2,
        product.SellLoose = req.body.SellLoose,
        product.ProdConv2 = req.body.ProdConv2,
        product.Unit3 = req.body.Unit3,
        product.IsExpiryApplied = req.body.IsExpiryApplied,
        product.IsMfgDateApplied = req.body.IsMfgDateApplied,
        product.IsUniqueIDapplied = req.body.IsUniqueIDapplied,
        product.IsColorApplied = req.body.IsColorApplied,
        product.IsBarCodeApplied = req.body.IsBarCodeApplied,
        product.Description = req.body.Description,
        product.FkprodCatgId = req.body.FkprodCatgId,
        product.MRP = req.body.MRP,
        product.Barcode = req.body.Barcode,
        product.Weight = req.body.Weight,
        product.Height = req.body.Height,
        product.Width = req.body.Width,
        product.Length = req.body.Length,
        product.WeightUnit = req.body.WeightUnit,
        product.HeightUnit = req.body.HeightUnit,
        product.Status = req.body.Status,
        product.Image = req.body.Image,
        product.BestBefore = req.body.BestBefore,
        product.BestBeforeUnit = req.body.BestBeforeUnit,
        product.Skudefinition = req.body.Skudefinition,
        product.HSNCode = req.body.HSNCode,
        product.MfgGroupName = req.body.MfgGroupName,
        product.GroupName = req.body.GroupName,
        product.GroupAlias = req.body.GroupAlias,
        product.MfgGroupAlias = req.body.MfgGroupAlias,
        product.Category = req.body.Category,
        product.CategoryGroup = req.body.CategoryGroup,
        product.CatgSKU = req.body.CatgSKU,
        product.Generic1 = req.body.Generic1,
        product.Generic2 = req.body.Generic2,
        product.BoxSize = req.body.BoxSize,
        product.Schedule = req.body.Schedule,
        product.Remarks = req.body.Remarks,
        product.Images = req.body.Images
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