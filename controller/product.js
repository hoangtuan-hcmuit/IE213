const mongoose = require('mongoose');
const Product = require("../model/product");

module.exports = {
    index: function(req, res, next) {
        Product.find()
        .exec()
        .then(docs => {
          // console.log(docs);
          //   if (docs.length >= 0) {
          res.status(200).json(docs);
          //   } else {
          //       res.status(404).json({
          //           message: 'No entries found'
          //       });
          //   }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
        }
}