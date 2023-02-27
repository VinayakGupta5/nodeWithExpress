const connectToDb = require('../../conn/connectMongoose')
const Product = require('../../models/ProductModel')
const mongooseDisconnect = require('../../conn/disconnectMongoose')

exports.getAllProducts = (req, res, next) => {
  const databaseName = req.userData.connectString

  async function mongoConnect() {
    await connectToDb(databaseName)
      .then((result) => {
        Product.find()
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
      })
  }
  mongoConnect();
}

exports.postMultipleProducts = (req, res, next) => {
  var existingDoc = []
  var notExistDoc = []
  const postsData = req.body
  const databaseName = req.userData.connectString


  const Ids = postsData.map((post) => post.PKID)

  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(result => {
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
              return res.send({
                status: 'success',
                message: "",
                data: {
                  existingProd: existingDoc,
                  successfullyAdded: result
                }
              })
            })
            .catch(err => {
              return res.send(err)
            })
        });

      })
  }
  mongoConnect()
}

exports.postProduct = (req, res, next) => {

  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(result => {
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
                  return res.send(result)
                })
                .catch(err => {
                  return res.send(err)
                })
            }
          })
      })
  }
  mongoConnect()
}

exports.getOneProductById = (req, res, next) => {
  const databaseName = req.userData.connectString

  async function mongoConnect() {
    await connectToDb(databaseName)
      .then((result) => {
        Product.findById(req.params._id)
          .then(product => {
            if (product) {
              return res.send({
                status: 'success',
                message: "",
                data: product
              })
            }
            else {
              return res.send({ message: "product not found!" })
            }
          })
      })
  }
  mongoConnect()
}

exports.updateProduct = (req, res, next) => {
  const databaseName = req.userData.connectString
  var _id = req.body._id
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

  async function mongoConnect() {
    await connectToDb(databaseName)
      .then((result) => {
        Product.findByIdAndUpdate(_id, updateProduct)
          .then(result => {
            return res.send(
              {
                status: 'success',
                message: "Updated Successfully",
                data: []
              }
            )
          })
          .catch(err => {
            return res.send(err)
          })
      })
  }
  mongoConnect()
}

exports.deleteProduct = (req, res, next) => {
  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then((result) => {
        Product.findByIdAndDelete(req.params._id)
          .then(result => {
            return res.send({
              status: 'success',
              message: "Deleted Successfully!",
              data: result
            })
          })
          .catch(err => {
            return res.send(err)
          })
      })
  }
  mongoConnect()
}

exports.getProductsPerPage = (req, res, next) => {
  const databaseName = req.userData.connectString
  var page = req.query.page
  var items_per_page = req.query.noOfItems
  if (page === 'undefined') {
    page = 1
  }
  if (items_per_page === 'undefined') {
    items_per_page = 20
  }

  async function mongoConnect() {
    await connectToDb(databaseName)
      .then((result) => {
        Product.find()
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

exports.checkProductsExist = (req, res, next) => {
  var existProdIds = []
  const databaseName = req.userData.connectString
  const ids = req.body

  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        await Product.find({ PKID: { $in: ids } })
          .then(result1 => {
            const existProdIds = result1?.map(pro => pro.PKID);
            return res.send({
              status: 'success',
              message: "",
              data: { PKID: existProdIds }
            })
          })
          .catch(err => {
            return res.send({
              status: "failed",
              err: err
            })
          })
      })
  }
  mongoConnect();
}

exports.getProductsByNameSearch = (req, res, next) => {
  const search = req.query.search
  var condition = search ? { NameToDisplay: { $regex: new RegExp(search), $options: "i" } } : {};

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then((result) => {
        Product.find(condition)
          .then(data => {
            return res.send({
              status: "success",
              msg: '',
              data: data
            });
          })
          .catch(err => {
           return res.status(500).send({
              status: "success",
              msg: err,
              data: []
            });
          });
      })
  }
  mongoConnect()
}


exports.filterProducts = (req, res, next) => {
  const catergorySearch = req.body.Category;
  const minPrice = req.body.minPrice
  const maxPrice = req.body.maxPrice


  const databaseName = req.userData.connectString
  async function mongoConnect() {
    const connection = await connectToDb(databaseName)
      .then((result) => {
        Product.find({
          // price: { $lt: maxPrice },
          Category: { $in: catergorySearch }
        })
          .then((products) => {
            return res.send(products)

          })
          .catch(err => {
            return console.log(err)
          })
      })
  }

  mongoConnect()
}

