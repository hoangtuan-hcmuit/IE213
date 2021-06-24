const express = require('express')
const productRouter = express.Router()

// Require product controller
const productController = require('../controller/product');

productRouter.get('/products', productController.index)

productRouter.get('/products/:type', productController.sort)

productRouter.get('/products/detail/:id', productController.detail)

productRouter.get('/products/search/:key', productController.search)

// productRouter.get('/create', productController.get_create)

// productRouter.post('/create', productController.post_create)

// productRouter.get('/:name', productController.show)

// Exports productRouter
module.exports = productRouter;