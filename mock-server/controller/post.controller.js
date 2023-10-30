const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
let posts = require('../mock-data/posts');

const uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const getTimeStamp = () => Math.floor(Date.now() / 1000);

router.get('/posts', (req, res) => {
  res.json(posts);
});

router.get('/posts/:id', (req, res) => {
  const post = posts.find((p) => +p.id === +req.params.id);

  if (!post) {
    res.status(404).json({ message: "Post not found with id: " + req.params.id});
  } else {
    res.json(post);
  }
});

router.post('/posts', (req, res) => {
  req.body.createdAt = getTimeStamp();
  posts.push(req.body);
  res.status(201).json(posts);
});

router.post('/posts/:id/image', upload.single('image'), (req, res) => {
  res.json({ message: 'File uploaded successfully', file: req.file })
})

router.put('/posts/:id', (req, res) => {
  const targetIndex = posts.findIndex((p) => +p.id === +req.params.id)
  req.body.id = +req.params.id;
  req.body.updatedAt = getTimeStamp();
  posts[targetIndex] = req.body;
  res.status(200).json(posts);
});

router.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  posts = posts.filter((post) => post.id !== id);
  res.status(204);
});

module.exports = router;
