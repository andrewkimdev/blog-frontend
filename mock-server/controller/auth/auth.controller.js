const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = require('../../shared/jwt-secret-key');
const MockUsers = require('../../mock-data/users');

const writeAuthData = require('../../shared/write-auth-data');
const readAuthData = require('../../shared/read-auth-data');
const getCurrentUnixTimeInSeconds = require('../../shared/time.helper')

router.post('/signup', async (req, res) => {
   try {
       const { username, password } = req.body;

       const userAuth = readAuthData();

       // Check if user already exists
       const userExists = userAuth.find(u => u.username === username);
       if (userExists) {
           return res.status(400).json({ message: 'User already exists'});
       }

       // Hash the password
       const hashedPassword = await bcrypt.hash(password, saltRounds);

       // Create a new user object
       const newUser = {
           id: userAuth.length + 1,
           username,
           password: hashedPassword,
           roles: ['user'],
       };

       // Add the new user to the UserAuth array
       userAuth.push(newUser);

       // Write updated auth data back to file
       writeAuthData(userAuth);

       // Respond with success
       res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
       res.status(500).json({ message: 'Error creating user: ', error});
   }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userAuth = readAuthData();

    const authData = userAuth.find( u => u.username === username);

    if (authData) {
        bcrypt.compare(password, authData.password, (err, result) => {
            if (result) {
                const userProfile = MockUsers.find(u => u.id === authData.id);
                const payload = {
                    iss: 'mock-server',
                    sub: authData.username,
                    roles: authData.roles,
                    aud: 'blog-kbi-web-app',
                    nbf: getCurrentUnixTimeInSeconds(),
                };
                const token = jwt.sign(payload, secretKey, { expiresIn: '1h'});
                res.json({ token, profile: userProfile });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        })
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
