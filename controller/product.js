const Product = require("../model/product");

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
      const product_id = req.params.id
      await Product.findById(product_id, product => {
        res.render('detail.ejs', {
          title: 'Detail',
          product: product
        });
      });
    }
};