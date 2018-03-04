const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require("./config");
const helper = require("./helper");
const Images = require('./model');
const ImageArray = [];

// connect to mongo
mongoose.connect(config.playerstat);

let arr = helper.generateArray(35300, 35321).then((pids) => {
    pids.forEach(pid => {
        ImageArray.push(helper.getImageData(pid.toString()));
    });
    Promise.all(ImageArray).then((response) => {
        console.log('mongo is open');
        response.forEach(imageData => {
            if (imageData.status == 200) {
                console.log(imageData.pid);
                const a = new Images();
                a.img.pid = imageData.pid;
                a.img.data = imageData.data;
                a.img.contentType = 'image/jpg';
                a.save((err, a) => {
                    if (err) throw err;
                    console.log('saved img to mongo');
                });
            }
        })
    })
});