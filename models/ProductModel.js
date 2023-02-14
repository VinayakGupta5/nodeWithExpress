const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
  PKID: {
    type: Number,
    required: true
  },
  NameToDisplay: {
    type: String,
    required: true
  },
  Brand: {
    type: String,
  },
  Strength: {
    type: String,
  },
  Unit1: {
    type: String,
  },
  ProdConv1: {
    type: Number,
  },
  Unit2: {
    type: String,
  },
  SellLoose: {
    type: Boolean,
  },
  ProdConv2: {
    type: Number,
  },
  Unit3: {
    type: String,
  },
  IsExpiryApplied: {
    type: Boolean,
  },
  IsMfgDateApplied: {
    type: Boolean,
  },
  IsUniqueIDapplied: {
    type: Boolean,
  },
  IsColorApplied: {
    type: Boolean,
  },
  IsBarCodeApplied: {
    type: Boolean,
  },
  Description: {
    type: String,

  },
  FkprodCatgId: {
    type: Number,

  },
  MRP: {
    type: Number,

  },
  Barcode: {
    type: Number,

  },
  Weight: {
    type: Number,

  },
  Height: {
    type: Number,

  },
  Width: {
    type: Number,

  },
  Length: {
    type: Number,

  },
  WeightUnit: {
    type: String,

  },
  HeightUnit: {
    type: String,

  },
  Status: {
    type: String,

  },
  Image: {
    data: Buffer,
    contentType: String
  },
  BestBefore: {
    type: Number,

  },
  BestBeforeUnit: {
    type: String,

  },
  Skudefinition: {
    type: String,

  },
  HSNCode: {
    type: String,

  },
  GroupName: {
    type: String,

  },
  MfgGroupName: {
    type: String,

  },
  GroupAlias: {
    type: String,

  },
  MfgGroupAlias: {
    type: String,

  },
  Category: {
    type: Array,

  },
  CategoryGroup: {
    type: String,

  },
  CatgSKU: {
    type: String,

  },
  Generic1: {
    type: String,

  },
  Generic2: {
    type: String,

  },
  BoxSize: {
    type: String,

  },
  Schedule: {
    type: String,

  },
  Remarks: {
    type: String,

  },
  Images: {
    type: String,
  },
  active: {
    type: Boolean
  }
})

module.exports = mongoose.model('Product', productSchema)