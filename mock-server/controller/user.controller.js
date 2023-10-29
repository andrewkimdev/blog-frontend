const express = require('express');
const router = express.Router();
const MockUsers = require('../mock-data/users');

router.get('/users', (req, res) => {
  res.json(MockUsers);
});

module.exports = router;
