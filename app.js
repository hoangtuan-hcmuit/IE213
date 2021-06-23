const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')

require('dotenv/config')

const app = express()

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))

// // set view directory 
app.set('views', './views');

// set templating engine
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('layout', './layouts/theme.ejs');


// Router
app.get('', function(req, res) {
  res.render('index', {title: 'Home Page'});
});

// app.get('/products', function(req, res) {
//   res.render('products', {title: 'Products', items:productRouter})
// })

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