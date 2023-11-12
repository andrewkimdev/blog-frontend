const fs = require('fs');
const path = require('path');

const authFilePath = path.join(__basedir, 'auth.json');

function readAuthData() {
    if (!fs.existsSync(authFilePath)) {
        fs.writeFileSync(authFilePath, JSON.stringify([]), 'utf8');
    }
    const rawData = fs.readFileSync(authFilePath, 'utf8');
    return JSON.parse(rawData);
}

module.exports = readAuthData;
