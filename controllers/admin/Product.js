const connectToDb = require('../../conn/connFunction')
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
  var existingDoc = []
  var notExistDoc = []
  const postsData = req.body

  const Ids = postsData.map((post) => {
    return post.PKID
  })

  Product.find({ 'PKID': { $in: Ids } }, function (err, existingDocFounded) {
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
        res.send(err)
      })
  });

}

exports.getOneProductById = (req, res, next) => {
  Product.findById(req.params._id)
    .then(product => {
      if (product) {
        return res.send(product)
      }
      else {
        return res.send({ message: "product not found!" })
      }
    })
}

exports.getAllProducts = (req, res, next) => {
  // const uri = "mongodb+srv://swildev:UDUGzXP8nNfhA3sR@swindia1.17wlqvp.mongodb.net/test?retryWrites=true&w=majority"
  //   // const uri = "mongodb+srv://swildev:UDUGzXP8nNfhA3sR@swindia1.17wlqvp.mongodb.net/SwilMain?retryWrites=true&w=majority"
  //   (async () => {
  //     const connection = await connectToDb(uri)
  //       .then(result => {
  Product.find()
    .then(products => {
      res.send(products)
    })
    .catch(err => {
      res.send(err)
    })
  // });
  // })();


}

exports.updateProduct = (req, res, next) => {
  const updateProduct =
  {
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
    active: req.body.active
  }
  Product.findByIdAndUpdate(req.body._id, updateProduct)
    .then(result => {
      res.send({ message: "Updated Successfully" })
    })
    .catch(err => {
      res.send(err)
    })


}

exports.deleteProduct = (req, res, next) => {

  // Product.deleteOne({ PKID: req.params.PKID })
  Product.findByIdAndDelete(req.params._id)
    .then(result => {
      return res.send(result)
    })
    .catch(err => {
      return res.send(err)
    })
}

exports.getProductsPerPage = (req, res, next) => {
  var page = req.query.page
  var items_per_page = req.query.noOfItems
  if (page === 'undefined') {
    page = 1
  }
  if (items_per_page === 'undefined') {
    items_per_page = 20
  }

  const databaseName = 'test';
  // const databaseName = 'SwilMain';
  (async () => {
    const connection = await connectToDb(databaseName)
      .then(result => {
        Product.find()
          .skip((page - 1) * items_per_page)
          .limit(items_per_page)
          .then(products => {
            res.send(products)
          })
          .catch(err => {
            res.send(err)
          })
      });
  })();
}

exports.checkProductsExist = (req, res, next) => {
  var existProdIds = []
  Product.find({ 'PKID': { $in: req.body } }, function (err, existingDocFounded) {
    existingDocFounded.forEach(pro => {
      existProdIds.push(pro.PKID)
    })
    res.send({ PKID: existProdIds })
  })
}
