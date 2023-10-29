const express = require('express');
const router = express.Router();
let data = require('../mock-data/categories');

router.get('/categories', (req, res) => {
  res.json(data);
});

router.post('/categories', (req, res) => {
  data.push(req.body);
  res.json(data);
});

router.delete('/categories/:categoryName', (req, res) => {
  const categoryName = req.params.categoryName;
  data = data.filter((category) => category.name !== categoryName);
  res.json(data);
});

module.exports = router;
