const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', (req, res, next) => {
  db.Post.findAll({
    order: [
      ['id', 'DESC'],
    ],
  }).then((data) => {
    const hbsObj = {
      posts: data
    }
    res.render('posts', hbsObj);
  });
});

router.post('/', (req, res, next) => {
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.user.username);
  db.Post.create({
    title: req.body.title,
    description: req.body.description,
    email: req.user.email,
    name: req.user.username,
  }).then(post => {
    res.redirect('/posts');
  }).catch((err) => {
    res.redirect('/posts');
  })

});

router.delete('/:id', (req, res) => {
  const email = req.user.email;
  const id = req.params.id;
  db.Post.findOne({
    where: {
      id: id,
    }
  }).then((post) => {
    if (post.email === email) {
      console.log("in deletion");
      db.Post.destroy({
        where: {
          id: id
        }
      }).then((response) => {
        res.status(200).send("Deleted");
      }).catch((error) => {
        res.status(500).send("Deletion Failed");
      });
    } else {
      res.status(403).send("Deletion Failed");
    }
  }).catch((err) => {
    res.status(500).json("Deletion failed");
  })
});



module.exports = router;