const Thing = require('../models/thing');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();

module.exports = {
    create,
};

function create(req, res) {  
    const filePath = `${uuidv4()}/${req.file.originalname}`
    const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
  
    s3.upload(params, async function(err, data) {
        try {
            const thing = await Thing.create({
                photoUrl: data.Location,
                title: req.body.title,
                description: req.body.description,
                owner: req.user
            });

            const newThing = new Thing(thing)
            await newThing.save()
            res.status(201).json({thing: newThing})
        } catch (error) {
            res.json({message: error});
        }
    }
}