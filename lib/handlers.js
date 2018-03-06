const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require("../helpers/config");
const helper = require("../helpers/helper");
const Images = require('../models/model');
const ImageArray = [];

// connect to mongo
mongoose.connect(config.playerstat);

const StoreImages = (request, reply) => {
    let min = request.query.min ? parseInt(request.query.min) : 0;
    let max = request.query.max ? parseInt(request.query.max) : 0;
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
            Promise.resolve(null);
        }).then(() => {
            reply({
                status: "success",
                message: "updated images to db"
            });
        }).catch((err) => {
            reply({
                status: "failure",
                err: err
            })
        })
    });
}

// const CreatePlayer = (request, reply) => {
//     var user = new Player(request.payload);

//     user.save((err) => {
//         if (err) {
//             reply({
//                 "err": err
//             })
//         } else {
//             reply(user);
//         }
//     });
// };

// const UpdatePlayer = (request, reply) => {
//     Player.findByIdAndUpdate(request.query.id, request.payload, {
//         new: true
//     }, (err, user) => {
//         if (err) {
//             reply({
//                 err: err
//             });
//         } else {
//             reply(user);
//         }
//     });
// };

// const DeletePlayer = (request, reply) => {
//     Player.remove(request.payload, (err, data) => {
//         if (err) {
//             reply({
//                 err: err
//             });
//         } else {
//             reply({
//                 message: "success"
//             });
//         }
//     });
// };

// const GetAllPlayers = (request, reply) => {
//     Player.find((err, users) => {
//         if (err) {
//             reply({
//                 'err': err
//             });
//         } else {
//             reply(users);
//         }
//     });
// };

// const GetOnePlayer = (request, reply) => {
//     reply(request.user);
// };

// const GetByIdPlayer = (request, reply) => {
//     let id = request.query.id;
//     Player.findOne({
//         _id: id
//     }, (err, user) => {
//         if (err) {
//             reply({
//                 err: err
//             });
//         } else {
//             reply(user);
//         }
//     });
// };
const GetAllImages = (request, reply) => {
    Images.find({}, '-data -img.data ', (err, users) => {
        if (err) {
            reply({
                'err': err
            });
        } else {
            reply({
                Images: users,
                Count: users.length
            });
        }
    });
};


const GetByIdImages = (request, reply) => {
    let pid = request.query.pid;
    Images.aggregate([{ "$unwind": "$img" },{"$match": {"img.pid" :  `${pid}`}}], (err, user) => {
        if (err) {
            reply({
                err: err
            });
        } else {
            reply(user);
        }
    });
};

module.exports = {
    storeImages: StoreImages,
    getAllImages: GetAllImages,
    getByIdImages: GetByIdImages
}