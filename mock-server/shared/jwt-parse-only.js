const jwt = require('jsonwebtoken');
const secretKey = require('../shared/jwt-secret-key');

const jwtParseOnly = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log(user);
            req.user = user;
            next();
        });
    } else {
        next();
    }
}

module.exports = jwtParseOnly;
