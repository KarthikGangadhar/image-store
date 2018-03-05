const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require("../helpers/config");
const helper = require("../helpers/helper");
const Images = require('../models/model');
const ImageArray = [];

// connect to mongo
mongoose.connect(config.playerstat);

const StoreImages = (request, reply) => {
    let min = request.query.min;
    let max = request.query.max
    helper.generateArray(min, max).then((pids) => {
        pids.forEach(pid => {
            ImageArray.push(helper.getImageData(pid.toString()));
        });
        Promise.all(ImageArray).then((response) => {
            console.log('mongo is open');
            response.forEach(imageData => {
                if (imageData.status == 200) {
                    console.log(imageData.pid);
                    const image = new Images();
                    image.img.pid = imageData.pid;
                    image.img.data = imageData.data;
                    image.img.contentType = 'image/jpg';
                    image.save((err, a) => {
                        if (err) throw err;
                        console.log('saved img to mongo');
                    });
                }
            })
            resolve(null);
        }).then(() => {
            resolve({
                status: "success",
                message: "updated images to db"
            });
        }).catch((err) => {
            resolve({
                status: "failure",
                err: err
            })
        })
    });
}

module.exports = {
    storeImages: StoreImages
}