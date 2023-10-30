const express = require('express');
const router = express.Router();

const multer = require('multer');
const fileUploadOptions = require('./file-upload-options');
const storage = multer.diskStorage(fileUploadOptions);
const upload = multer({ storage });
const updateFileDatabase = require('./fileinfo-db');

let posts = require('../../mock-data/posts');

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
  const file = req.file;
  const uploaderUserId = req.body.userId || null;

  console.log("Received filename: ", req.file.originalname);
  console.log(req.file.name);

  const record = {
    originalFileName: file.originalname,
    savedFileName: file.filename,
    size: file.size,
    uploadedTime: new Date(),
    uploaderUserId,
  };

  updateFileDatabase(record);

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
