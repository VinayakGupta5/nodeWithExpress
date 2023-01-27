const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/admin/admin')
const cors = require('cors')


const port = 1234

const app = express()
app.use(cors())

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }))


// To parse or accept data in raw json from postman
// app.use(bodyParser.json())


app.use('/admin', adminRoutes)


mongoose.set('strictQuery', false);

mongoose.connect(
  // 'mongodb+srv://ecommerce:2BDDE5I9PwK6ZGOV@cluster0.1x9aowm.mongodb.net/?retryWrites=true&w=majority'
  "mongodb+srv://swildev:UDUGzXP8nNfhA3sR@swindia1.17wlqvp.mongodb.net/?retryWrites=true&w=majority"
)
  .then(result => {
    console.log("mongoDb Connected successfully")
    app.listen(port, () => {
      console.log("listen server on http://localhost:" + port)
    })
  })
  .catch(err => {
    console.log("mongoDb connection Failed!")
  })

