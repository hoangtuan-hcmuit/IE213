const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
// require controller
const indexController = require("../controller/index");

// Home Page
router.get('/', indexController.home);

// Dashboard
router.get('/dashboard', ensureAuthenticated, indexController.dashboard);

module.exports = router;