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
  res.render('login', {
    title: "In Login"
  });
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));

router.post('/register', (req, res, next) => {
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('confirmPassword', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('confirmPassword', 'Passwords do not match, please try again.').equals(req.body.password);
  req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');


  const errors = req.validationErrors();
  if (errors) {
    res.render('login', {
      title: 'Registration Error',
      errors,
    });
  } else {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    db.User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    }).then((user) => {
      const userId = user.id;
      req.login(userId, () => {
        res.redirect('/');
      });
    }).catch((err) => {
      res.status(500).render('login', {
        title: 'Something went wrong',
      });
    });
  }
});

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});


module.exports = router;
