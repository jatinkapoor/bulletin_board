const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', (req, res, next) => {
  db.Post.findAll({
    order: [
      ['id', 'DESC'],
    ],
  }
  ).then((data) => {  
    const hbsObj = {
      posts: data
    }
    res.render('posts', hbsObj );
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
    console.log('post created');
    console.log(post);
    res.redirect('/posts');
  }).catch((err)=> {
    res.redirect('/posts');
  })
  
});

router.delete('/:id', (req, res) => {
  console.log("$$$$$$$$$$$$$$$$$$$$");
  const id = req.params.id;
  db.Post.destroy({
    where: {
      id: id
    }
  }
).then((response)=> {
    res.status(200).send("deleted");
  }).catch((error) => {
    res.status(500).send("Deletion Failed");
  });
});

module.exports = router;
