const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const uploadDirectory = path.join(__dirname , '../../uploads');

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const fileUploadOptions = {
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}-${Date.now()}`);
    },
};

module.exports = fileUploadOptions;
