const express = require('express');

const AlbumEntryCtrl = require('../controllers/albumEntry-ctrl');

const router = express.Router();

router.post('/albumEntry', AlbumEntryCtrl.createAlbumEntry);
router.put('/albumEntry/:id', AlbumEntryCtrl.updateAlbumEntry);
router.delete('/albumEntry/:id', AlbumEntryCtrl.deleteAlbumEntry);
router.get('/albumEntry/:id', AlbumEntryCtrl.getAlbumEntryById);
// router.get('/albumEntries', AlbumEntryCtrl.getAlbumEntries);
router.get('/albumEntries', AlbumEntryCtrl.getAlbumEntriesByPage);

module.exports = router