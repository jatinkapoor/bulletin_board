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
      id: req.user.id,
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

router.get('/delete', (req, res) => {
  const id = req.user.id;
  db.User.destroy({
    where: {
      id: req.user.id,
    }
  }).then(function (result) {
    res.status(200).redirect('/logout');
  }).catch((error)=> {
    debug(error);
    res.status(500).redirect('/profile');
  })
});



module.exports = router;