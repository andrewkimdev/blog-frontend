const express = require('express');
const router = express.Router();
let posts = require('../mock-data/posts');

const getTimeStamp = () => Math.floor(Date.now() / 1000);

router.get('/posts', (req, res) => {
  res.json(posts);
});

router.get('/posts/:id', (req, res) => {
  const post = posts.find((p) => +p.id === +req.params.id);
  res.json(post);
});

router.post('/posts', (req, res) => {
  req.body.createdAt = getTimeStamp();
  posts.push(req.body);
  res.json(posts);
});

router.put('/posts/:id', (req, res) => {
  const targetIndex = posts.findIndex((p) => +p.id === +req.params.id)
  req.body.id = +req.params.id;
  req.body.updatedAt = getTimeStamp();
  posts[targetIndex] = req.body;
  res.json(posts);
});

router.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  posts = posts.filter((post) => post.id !== id);
  res.json(posts);
});

module.exports = router;
