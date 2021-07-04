const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ensureAuthenticated } = require('../config/auth');
// require controller
const indexController = require("../controller/index");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

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
router.post('/profile', upload.single('image'), indexController.updateInfo);

module.exports = router;