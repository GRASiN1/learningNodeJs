const mongoose = require('mongoose');

async function connection(url) {
    mongoose.connect(url).then(() => {
        console.log("MongoDB connected");
    })
}

module.exports = connection;