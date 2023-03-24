const connectToDb = require('../../conn/connectMongoose')
const Setting = require('../../models/SettingModel')
exports.CreateSetting = (req, res, next) => {
  console.log("req.userData", req.userData)
  const setting = new Setting({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    gstNo: req.body.gstNo
  })

  async function mongoConnect() {
    await connectToDb(req.userData.connectString)
      .then((result) => {
        setting.save()
          .then(response => {
            return res.status(201).send({
              status: 'success',
              msg: '',
              data: response
            })
          })
          .catch((err) => {
            return res.status(500).send({
              status: 'failed',
              msg: '',
              data: []
            })
          })

      })
  }

  mongoConnect();

}

exports.GetSettings = (req, res, next) => {

  async function mongoConnect() {
    await connectToDb(req.userData.connectString)
      .then((result) => {
        Setting.find()
          .then(response => {
            return res.status(200).send({
              status: 'success',
              msg: '',
              data: response
            })
          })
          .catch((err) => {
            return res.status(500).send({
              status: 'failed',
              msg: '',
              data: []
            })
          })

      })
  }

  mongoConnect();
}

exports.UpdateSetting = (req, res, next) => {
 
  const _id = req.params._id;
  const setting = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    gstNo: req.body.gstNo
  }

  console.log("setting", setting)
  console.log("_id", _id)

  async function mongoConnect() {
    await connectToDb(req.userData.connectString)
      .then((result) => {
        Setting.findOneAndUpdate(_id, setting, { new: true })
          .then(response => {
            return res.status(200).send({
              status: 'success',
              msg: '',
              data: response
            })
          })
          .catch((err) => {
            return res.status(500).send({
              status: 'failed',
              msg: err,
              data: []
            })
          })

      })
  }
  mongoConnect();
}

exports.DeleteSettingById = (req,res,next) => {

  const _id = req.params._id
  console.log("_id", _id)
  async function mongoConnect() {
    await connectToDb(req.userData.connectString)
      .then((result) => {
        Setting.findOneAndDelete(_id)
          .then(response => {
            return res.status(200).send({
              status: 'success',
              msg: '',
              data: response
            })
          })
          .catch((err) => {
            return res.status(500).send({
              status: 'failed',
              msg: '',
              data: []
            })
          })

      })
  }

  mongoConnect();
}

