const { Schema, model, default: mongoose } = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
}, { timestamps: true });

const Blog = model('blogs', blogSchema);

module.exports = Blog;