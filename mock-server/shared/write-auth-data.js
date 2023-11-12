const fs = require('fs');
const path = require('path');

const authFilePath = path.join(__basedir, 'auth.json');

function writeAuthData(data) {
    fs.writeFileSync(authFilePath, JSON.stringify(data, null, 2));
}

module.exports = writeAuthData;
