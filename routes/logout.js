const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({
  extended: true,
}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;
