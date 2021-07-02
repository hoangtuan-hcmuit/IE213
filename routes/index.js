const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Home Page
router.get('/', (req, res) => res.render('pages/index', {title: 'Home', user: req.user}));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('pages/dashboard', {
    title: 'Dashboard',
    user: req.user
  })
);

module.exports = router;