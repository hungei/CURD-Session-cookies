require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const sessionConfig = require('./config/session');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionConfig);

// make currentUser available in views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("✅ Server chạy tại http://localhost:3000"));
