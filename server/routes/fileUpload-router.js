const express = require('express');
const FileUploadCtrl = require('../controllers/fileUpload-ctrl');
const router = express.Router();

router.post('/upload', FileUploadCtrl.uploadFile);

module.exports = router;