const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');



require('dotenv/config')

const app = express()

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

// set templating engine
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('layout', './layouts/theme.ejs');

// Router
app.get('', function(req, res) {
  res.render('index', {title: 'Home Page'});
});

app.get('/signin', function(req, res) {
  res.render('signin', {title: 'Sign in'});
})

app.get('/signup', function(req, res) {
  res.render('signin', {title: 'Sign in'});
})

// Require product route
const productRouter = require('./routes/product')
app.use('/', productRouter);

// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION, 
  { useUnifiedTopology: true, useNewUrlParser: true }, 
  () => console.log('Connected to DB')
);

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})