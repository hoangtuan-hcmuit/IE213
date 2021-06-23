const Product = require("../model/product");

module.exports = {
    index: function(req, res) {
        Product.find({}, function(err, data) {
          res.render('products.ejs', {
            title: 'Product', 
            products: data
          });
        });
    }
}