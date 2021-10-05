const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    created_by: Types.ObjectId,
    categories: Types.Array,
    title: String,
    content: String,
    comments: String,
    likes: Number,
    createdAt: { type: Date, required: false, default: Date.now }
})

const Post = model('posts', postSchema);

module.exports = Post;

