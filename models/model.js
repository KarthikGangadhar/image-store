// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Images', new Schema({
    img: {
        pid: { type : String , unique : true, required : true, dropDups: true },
        data: Buffer,
        contentType: String
    }
}));