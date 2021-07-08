const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
// var MongoStore = require('connect-mongo')(session);

require("dotenv").config()

// Passport Config
require('./config/passport')(passport);

// Require route
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const router = require('./routes/index');

const app = express()

// Static files
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))


// middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// Express session
app.use(
  session({
    secret: 'MySecret',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 24*60*60*1000}
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});

// set templating engine
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('layout', './layouts/theme.ejs');

//route
app.use('/', router)

app.use('/', productRouter);

app.use('/users', userRouter);


// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION, 
  { useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true, useFindAndModify: false}, 
  () => console.log('Connected to DB')
);

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})