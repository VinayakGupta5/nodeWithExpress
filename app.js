require('dotenv').config();
const express = require('express')
const adminRoutes = require('./routes/admin/adminRouter')
const authRoutes = require('./routes/admin/AuthRouter')
const promotionRoutes = require('./routes/admin/PromotionRouter')
const cors = require('cors')
const isAuth = require('./middleware/isAuth');
const customerAuthRouter = require('./routes/customer/AuthCustomerRouter')
const customerRouter = require('./routes/customer/CustomerRouter')


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
app.use('/api/admin', isAuth, adminRoutes)
app.use('/api/promotion', isAuth, promotionRoutes)


app.use('/api/customer', customerAuthRouter)
app.use('/api/customer', isAuth, customerRouter)



app.listen(port, () => {
  console.log("listen server on http://localhost:" + port)
})