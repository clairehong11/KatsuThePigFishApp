const AlbumEntry = require('../models/albumEntry-model');

createAlbumEntry = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Album Entry'
        });
    }

    const albumEntry = new AlbumEntry(body);

    if (!albumEntry) {
        return res.status(400).json({ success: false, error: err });
    }

    albumEntry
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: albumEntry._id,
                message: 'Album Entry created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Failed to create Album Entry'
            })
        })
}

updateAlbumEntry = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an entry to update'
        })
    }

    AlbumEntry.findOne({ _id: req.params.id }, (err, albumEntry) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Album Entry not found'
            })
        }
        albumEntry.mediaUrl = body.mediaUrl;
        albumEntry.description = body.description;
        albumEntry.dateCaptured = body.dateCaptured;
        albumEntry
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: albumEntry._id,
                    message: 'Album Entry updated'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Failed to update Album Entry'
                })
            })
    })
}

deleteAlbumEntry = async (req, res) => {
    await AlbumEntry.findOneAndDelete({ _id: req.params.id }, (err, albumEntry) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!albumEntry) {
            return res.status(400).json({
                success: false,
                error: 'Album Entry not found'
            })
        }

        return res.status(200).json({ success: true, data: albumEntry });
    }).catch(err => console.log(err));
}

getAlbumEntryById = async (req, res) => {
    await AlbumEntry.findOne({ _id: req.params.id }, (err, albumEntry) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!albumEntry) {
            return res.status(404).json({
                success: false,
                error: 'Album Entry not found'
            })
        }
        return res.status(200).json({ success: true, data: albumEntry });
    }).catch(err => console.log(err));
}

// getAlbumEntries = async (req, res) => {
//     await AlbumEntry.find({}, (err, albumEntries) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err });
//         }
//         if (!albumEntries.length) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Album Entries not found'
//             });
//         }
//         return res.status(200).json({ success: true, data: albumEntries });
//     }).catch(err => console.log(err));
// }

getAlbumEntriesByPage = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.size) || 8;
    var query = {};
    const count = await AlbumEntry.countDocuments(query);
    await AlbumEntry.find({})
        .sort( '-createdAt' )
        .skip(page * limit)
        .limit(limit)
        .exec((err, albumEntries) => {
            if (err) {
                return res.status(400).json({ success: false, error: err });
            }
            return res.status(200).json({ 
                success: true,
                response: {
                    grid: albumEntries,
                    totalCount: count,
                    page: page,
                    size: limit
                }
            })
        })

}

module.exports = {
    createAlbumEntry,
    updateAlbumEntry,
    deleteAlbumEntry,
    getAlbumEntryById,
    // getAlbumEntries,
    getAlbumEntriesByPage
}