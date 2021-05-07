const express = require('express');
const MediaFileCtrl = require('../controllers/mediaFile-ctrl');
const router = express.Router();

router.post('/mediaFile/upload', MediaFileCtrl.uploadFile);
router.post('/mediaFile/delete', MediaFileCtrl.deleteFile);

module.exports = router;