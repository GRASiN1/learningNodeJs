const mongoose = require('mongoose');

function connection(URL) {
    mongoose.connect(URL).then(() => {
        console.log("MongoDB connected");
    })
}

module.exports = connection;