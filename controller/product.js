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
      })
    },
    detail: async function(req, res) {
      await Product.findOne({_id: req.params.id}, function(err, data) {
        res.render('detail.ejs', {
          title: 'Detail',
          product: data
        });
      });
    }
};