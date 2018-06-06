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
  db.User.findOne({
    where: {
      email: req.user.email,
    },
    attributes: ['id', 'username', 'email']
  }).then((user) => {
    const person = {
      name: user.username,
      email: user.email,
    };
    res.render('profile', { person });
  });
});

router.post('/', (req, res) => {
  req.checkBody('password-confirm', 'Passwords do not match, please try again.').equals(req.body.password);
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const email = req.body.email;

  console.log(username);
  console.log(password);
  console.log(confirmPassword);
  console.log(email);

  const errors = req.validationErrors();
  if (errors) {
    res.render('profile', {
      title: 'Registration Error',
      errors,
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;