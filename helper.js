const httpRequest = require("request");
const Util = require("util");
const config = require("./config");

const GetImageData = (pid) => {
    let imgPath = Util.format(config.imgPath, pid);
    return new Promise((resolve, reject) => {
        httpRequest.get(imgPath, (err, resp, body) => {
            if (err) {
                reject(err)
            } else {
                resolve({
                    url: imgPath,
                    pid: pid,
                    data: body,
                    status: resp.statusCode
                });
            }
        });
    })
}

const GenerateArray = (start, stop, step) => {
    return new Promise((resolve, reject) => {
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        step = step || 1;

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }
        resolve(range);
    });
};

module.exports = {
    getImageData: GetImageData,
    generateArray: GenerateArray
}