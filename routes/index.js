const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
// require controller
const indexController = require("../controller/index");
const { index } = require('../controller/product');

// Home Page
router.get('/', indexController.home);

// Dashboard
router.get('/profile', ensureAuthenticated, indexController.profile);

// GET: add a product to cart when add to cart
router.get('/add-to-cart/:id', indexController.addToCart);

// GET: cart contents
router.get('/cart', indexController.cartContent);

// GET: remove each row cart
router.get('/remove/:id', indexController.remove);

// POST: update info
router.post('/profile', indexController.updateInfo);

module.exports = router;