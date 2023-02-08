require('dotenv').config();
const express = require('express')
const adminRoutes = require('./routes/admin/admin')
const authRoutes = require('./routes/admin/AuthRouter')
const cors = require('cors')
const connectToDb = require('./conn/connFunction');
const isAuth = require('./middleware/isAuth');
const { encrypt, secretKey, decrypt } = require('./Global/Global');
const crypto = require('crypto')

const port = 1234


const app = express()
app.use(cors())

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/auth', authRoutes)
app.use('/admin', isAuth, adminRoutes)


// const databaseName = 'test';
const databaseName = 'test';
(async () => {
  const connection = await connectToDb(databaseName)
    .then(result => {
      console.log("connect database successfully")
    });
})();

app.listen(port, () => {
  console.log("listen server on http://localhost:" + port)

})






