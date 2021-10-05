const Post = require("./../models/posts.model");
const { postFields } = require("./../utils/fields");

const listPosts = (req, res) => {
  Post.find({}, { __v: 0 }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
      });
    }
    res.status(200).json({
      data: result,
    });
  });
};

const createPost = (req, res) => {
  const { created_by, categories, title, content } = req.body;

  if (!created_by || !categories || !title || !content) {
    res.status(400).json({
      data: postFields,
    });
  } else {
    const post = new Post({ created_by, categories, title, content });
    post.save((err, result) => {
      console.log(err);
      if (err) {
        res.status(500).json({
          message: "Error al crear la publicación",
        });
      } else {
        res.status(200).json({
          message: "Publicación creada correctamente",
        });
      }
    });
  }
};

module.exports = {
    createPost,
    listPosts
};
