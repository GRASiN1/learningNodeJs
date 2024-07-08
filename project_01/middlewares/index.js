const fs = require('fs');

function logReq(filename) {
    return (req, res, next) => {
        const log = `\nNew Req at : ${Date.now()} | ${req.method} | ${req.path}`;
        fs.appendFile(filename, log, (err, data) => {
            if (err) return res.send(err);
        })
        next();
    }
}

module.exports = logReq;