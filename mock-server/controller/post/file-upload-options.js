const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const uploadDirectory = path.join(__basedir , 'uploads', 'files');

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const fileUploadOptions = {
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}`);
    },
};

module.exports = fileUploadOptions;
