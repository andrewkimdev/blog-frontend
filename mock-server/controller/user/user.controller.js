const express = require('express');
const router = express.Router();
const MockUsers = require('../../mock-data/users');

router.get('/users', (req, res) => {
  res.json(MockUsers);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = MockUsers.find(user => user.id === id);
  if (user) {
      res.json(user);
  } else {
    res.status(404);
  }
})

module.exports = router;
