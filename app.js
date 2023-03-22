require('dotenv').config();
const express = require('express')
const ProductAdminRouter = require('./routes/admin/ProductAdminRouter')
const AuthAdminRouter = require('./routes/admin/AuthAdminRouter')
const PromotionAdminRouter = require('./routes/admin/PromotionAdminRouter')
const CategoryAdminRouter = require('./routes/admin/CategoryAdminRouter')

const isAuth = require('./middleware/isAuth');
const customerAuthRouter = require('./routes/customer/AuthCustomerRouter')
const customerRouter = require('./routes/customer/CustomerRouter')
const customerAdminRouter = require('./routes/admin/CustomerAdminRouter')


const cors = require('cors');
const port = 1234;

const app = express()
app.use(cors({
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  origin: 'http://localhost:3000',
  allowedHeaders: ['Authorization', 'Content-Type']
}))


app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }))


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use('/api/auth', AuthAdminRouter)
app.use('/api/admin', isAuth, ProductAdminRouter)
app.use('/api/admin', isAuth, customerAdminRouter)
app.use('/api/admin', isAuth, PromotionAdminRouter)
app.use('/api/admin', isAuth, CategoryAdminRouter)


app.use('/api/customer', customerAuthRouter)
app.use('/api/customer', isAuth, customerRouter)


app.listen(port, () => {
  console.log("listen server on http://localhost:" + port) 
})   