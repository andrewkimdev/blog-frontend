const fs = require('fs');
const path = require('path');

function updateFileDatabase(record) {
    const dbPath = path.join(__dirname, 'uploaded-file.json');

    // Reading existing records
    let data;
    try {
        data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    } catch (error) {
        data = [];
    }

    // Add new record
    data.push(record);

    // Save back to file
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = updateFileDatabase;
