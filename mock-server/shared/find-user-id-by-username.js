const MockUsers = require("../mock-data/users");
const readAuthData = require('../shared/read-auth-data');

const authData = readAuthData();

function findUserIdByUsername(username) {
    return authData.find(u => u.username === username)?.id || null;
    // return MockUsers.find(u => u.username === username)?.id || null;
}

module.exports = findUserIdByUsername;