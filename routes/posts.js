const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('posts');
});

module.exports = router;
