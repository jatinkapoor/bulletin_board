const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('../models/');
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({
  extended: true,
}));
router.use(bodyParser.json());


router.get('/', (req, res) => {
  const flashMessages = res.locals.getMessages();
  if (flashMessages.error) {
    res.render('login', {
      showErrors: true,
      errors: flashMessages.error
    });
  } else {
    res.render('login');
  }
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});


module.exports = router;
