const Product = require("../model/product.model");

module.exports = {
    index: async function(req, res) {
      await Product.find({}, function(err, data) {
        res.render('products.ejs', {
          title: 'Product', 
          products: data
        });
      });
    },
    // Sort theo type
    sort: async function(req, res) {
      await Product.find({type: req.params.type}, function(err, data) {
        res.render('products.ejs', {
          title: 'Product',
          products: data
        });
      });
    },
    // Thong tin san pham
    detail: async function(req, res) {
      await Product.findOne({name: req.params.name}, function(err, data) {
        res.render('detail.ejs', {
          title: 'Detail',
          product: data
        });
      });
    },
    // Tim kiem san pham
    search: async function(req, res) {
      await Product.find({ $text: {$search: req.query.search}}, function(err, data) {
        res.render('products.ejs', {
          title: 'Search',
          products: data
        });
      });
    }
};