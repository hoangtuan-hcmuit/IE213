const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    decription: {
        type: String,
        require: true
    },
    price: Number,
    type: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
});

productSchema.index({name: 'text'});

module.exports = mongoose.model('Product', productSchema, 'product');