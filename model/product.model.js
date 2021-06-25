const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    type: String,
    image: String
});

productSchema.index({name: 'text'});

module.exports = mongoose.model('Product', productSchema, 'product');