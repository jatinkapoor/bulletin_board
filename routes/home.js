const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.isAuthenticated());
  res.render('home');
});

module.exports = router;
