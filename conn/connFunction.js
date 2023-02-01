const mongoose = require('mongoose')

// function ConnMongoose() {

 const ConnMongoose = mongoose.connect(
    // 'mongodb+srv://ecommerce:2BDDE5I9PwK6ZGOV@cluster0.1x9aowm.mongodb.net/?retryWrites=true&w=majority'
    // "mongodb+srv://swildev:UDUGzXP8nNfhA3sR@swindia1.17wlqvp.mongodb.net/SwilMain?retryWrites=true&w=majority"
    "mongodb+srv://swildev:UDUGzXP8nNfhA3sR@swindia1.17wlqvp.mongodb.net/test?retryWrites=true&w=majority"
  )
    .then(result => {
      console.log("before", a)
      console.log("mongooose Connected successfully")
      console.log("after", a)

    })
    .catch(err => {
      console.log("mongoDb connection Failed!")
    })
// }


module.exports = ConnMongoose

