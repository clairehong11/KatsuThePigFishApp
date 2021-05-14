const fs = require('fs');
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})
const s3 = new AWS.S3();

uploadFile = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must upload a file to create a new Album Entry'
        });
    }

    const form = formidable();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log('Error', err);
        }
        const file = files.file;
        const fileStream = fs.createReadStream(file.path);
        fileStream.on('error', err => console.log('File Error', err));
      
        const uploadParams = {
            Bucket: process.env.BUCKET,
            Key: `${uuidv4()}_${file.name}`,
            Body: fileStream,
            ACL: 'public-read',
            ContentType: file.type
        };
        
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                console.log('Error', err);
            }
            if (data) {
                console.log('Upload Success', data.Location);
                return res.status(200).json({
                    success: true,
                    url: data.Location
                })
            }
        });
    })
}

deleteFile = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide the file to delete.'
        })
    }

    const params = {
        Bucket: process.env.BUCKET,
        Key: body.fileName
    };
    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log('Delete Success', data);
            return res.status(200).json({
                success: true,
                message: "Storage object successfully deleted."
            })
        }
    })
}

module.exports = {
    uploadFile,
    deleteFile
};