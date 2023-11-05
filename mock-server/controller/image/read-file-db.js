const path = require("path");
const fs = require("fs");

const getFileInfo = (uuid) => {
  const dbPath = path.join(__basedir, 'uploads', 'uploaded-file.json');
  try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const fileInfo = data.find(f => f.savedFileName === uuid);
    return !fileInfo ? null : fileInfo;
  } catch (error) {
    return null;
  }
}

module.exports = getFileInfo;
