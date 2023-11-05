const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const multer = require('multer');
const fileUploadOptions = require('./file-upload-options');
const storage = multer.diskStorage(fileUploadOptions);
const upload = multer({storage});
const updateFileDatabase = require('./update-file-db');
const getFileInfo = require('./read-file-db');

router.post('/image', upload.single('image'), (req, res) => {
    const file = req.file;
    const uploaderUserId = req.body.userId || null;
    const decodedFileName = decodeURIComponent(req.file.originalname);

    const record = {
        originalFileName: decodedFileName,
        savedFileName: file.filename,
        size: file.size,
        uploadedTime: new Date(),
        uploaderUserId,
        contentType: file.mimetype,
    };

    updateFileDatabase(record);

    res.json({message: 'File uploaded successfully', file: req.file, id: file.filename})
});

router.get('/images/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    // Validate the uuid here to make sure it's safe to use in a file path

    const filePath = path.join(__basedir, 'uploads', 'files', uuid);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send({message: 'File not found for ' + uuid});
        }

        const readStream = fs.createReadStream(filePath);
        const fileInfo = getFileInfo(uuid); // Make sure this is safely determined

        console.log('fileinfo: ' + fileInfo)

        res.setHeader('Content-Type', fileInfo.contentType);

        readStream.on('error', (error) => {
            console.error(error);
            res.status(500).send({message: 'An error occurred while reading the file.'});
        });

        readStream.pipe(res);
    });
});

module.exports = router;
