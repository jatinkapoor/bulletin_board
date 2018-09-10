const express = require('express');
const debug = require('debug');

const router = express.Router();

router.get('/', (req, res, next) => {
  debug(req.isAuthenticated());
  res.render('home');
});

module.exports = router;
