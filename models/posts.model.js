const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema({
  created_by: {
    type: {
      id: Types.ObjectId,
      lastName: String,
      firstName: String,
    }
  },
  categories: { type: Array, required: true },
  title: String,
  content: String,
  comments: { type: Array, required: false, default: new Array() },
  likes: { type: Array, required: false, default: new Array() },
  createdAt: { type: Date, required: false, default: Date.now },
});

const Post = model("posts", postSchema);

module.exports = Post;
