const express = require('express');
const router = express.Router();
const loggedInOnly = require('../../shared/logged-in-only');
const jwtParseOnly = require('../../shared/jwt-parse-only');
const findUserIdByUsername = require('../../shared/find-user-id-by-username');

let posts = require('../../mock-data/posts');
const MockUsers = require('../../mock-data/users');

const getTimeStamp = () => Math.floor(Date.now() / 1000);

router.get('/posts', jwtParseOnly, (req, res) => {
  const payload = posts.filter(post => !post.isDraft);
  return res.json(payload);
});

router.get('/posts/:id', (req, res) => {
  const post = posts.find((p) => +p.id === +req.params.id);

  if (!post) {
    res.status(404).json({ message: "Post not found with id: " + req.params.id});
  } else {
    post.author = MockUsers.find((u) => +u.id === +post.authorId);
    res.json(post);
  }
});

router.post('/posts', loggedInOnly, (req, res) => {
  const userId = findUserIdByUsername(req.user.sub);

  req.body.createdAt = getTimeStamp();

  // todo: make this database-dependent
  const ids = posts.map(p => p.id);

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const nextId = maxId + 1;

  // add single-post-home to single-post-home-list array
  const newPost = {
    id: nextId,
    createdAt: getTimeStamp(),
    authorId: userId,
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

router.put('/posts/:id', jwtParseOnly, (req, res) => {
  if (['null', 'undefined', ''].includes(req.body.id)) {
      res.status(400).json({ message: 'id cannot be non-numeric: ' + req.body.id });
  }

  const userId = findUserIdByUsername(req.user.sub);
  if (userId === null) {
    res.sendStatus(401);
  }

  const targetIndex = posts.findIndex((p) => +p.id === +req.params.id)
  const targetPost = posts[targetIndex];

  if (targetPost.authorId !== userId) {
    res.sendStatus(401);
  }

  req.body.id = +req.params.id;
  req.body.updatedAt = getTimeStamp();

  posts[targetIndex] = req.body;
  res.status(200).json(posts[targetIndex]);
});

router.delete('/posts/:id', (req, res) => {
  const id = +req.params.id;
  console.log('deleting a post by id: ', id);
  posts = posts.filter((post) => post.id !== id);
  res.status(204).json();
});

module.exports = router;
