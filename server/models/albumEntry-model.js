const mongoose = require('mongoose')
const Schema = mongoose.Schema

// automatically creates _id, createdAt, updatedAt fields
const AlbumEntry = new Schema(
    {
        mediaUrl: { type: String, required: true },
        description: { type: String },
        dateCaptured: { type: String }
    },
    { timestamps: true }
)

module.exports = mongoose.model('albumEntries', AlbumEntry)