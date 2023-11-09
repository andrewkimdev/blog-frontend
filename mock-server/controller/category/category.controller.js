const express = require('express');
const router = express.Router();
let data = require('../../mock-data/categories');

router.get('/categories', (req, res) => {
  res.json(data);
});

router.post('/categories', (req, res) => {
  const newCategoryName = req.params.newCategoryName;
  // Add sanity check later
  data.push(newCategoryNamee);
  res.status(201).json({name: newCategoryName});
});

router.delete('/categories/:categoryName', (req, res) => {
  const categoryName = req.params.categoryName;
  data = data.filter((category) => category.name !== categoryName);
  res.json(data);
});

module.exports = router;
