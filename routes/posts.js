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
  db.Post.create({
    title: req.body.title,
    description: req.body.description,
    email: req.user.email,
    name: req.user.username,
  }).then(post => {
    console.log("***************");
    console.log("in posts");
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
      res.status(403).send("You are not authorized to delete this post");
    }
  }).catch((err) => {
    res.status(500).json("Deletion failed");
  })
});



module.exports = router;