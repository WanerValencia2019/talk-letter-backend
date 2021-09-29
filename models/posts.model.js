const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    created_by: Types.ObjectId,
    title: String,
    content: String,
    comments: String,
    likes: Number,
})

const Post = model('posts', postSchema);

module.exports = Post;

