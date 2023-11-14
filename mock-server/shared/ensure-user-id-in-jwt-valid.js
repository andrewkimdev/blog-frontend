const findUserIdByUsername = require("./find-user-id-by-username");

const ensureUserIdInJwtValid = (req, res, next) => {
    const userId = findUserIdByUsername(req.user.sub);
    if (userId === null) {
        res.sendStatus(401);
    } else {
        next();
    }
}

module.exports = ensureUserIdInJwtValid;
