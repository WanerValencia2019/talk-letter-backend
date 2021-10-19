const Post = require("./../models/posts.model");
const { postFields } = require("./../utils/fields");

const listPosts = (req, res) => {
  Post.find({}, { __v: 0 }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
      });
    }
    res.status(200).json(result);
  });
};

const createPost = (req, res) => {
  const { categories, title, content } = req.body;
  const { id, firstName, lastName } = req?.userTokenInfo?.user;
  if (!categories || !title || !content) {
    res.status(400).json({
      ...postFields,
    });
  } else {
    const post = new Post({ 
      created_by: {
        id,
        firstName, 
        lastName 
      },
      categories, title, content });
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

const updatePost = (req, res) => {
  const { categories, title, content } = req.body;
  const { id } = req.params;
  const user = req?.userTokenInfo?.user;
  delete postFields["created_by"];
  if (!categories || !title || !content) {
    res.status(400).json({
      ...postFields,
    });
  } else {
    Post.updateOne(
      { created_by: user?.id, _id: id},
      {
        categories: categories,
        title: title,
        content: content,
      },
      {},
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Error al actualizar la publicación",
          });
        }
        if (result.modifiedCount === 1) {
          res.status(200).json({
            message: "Publicación actualizada correctamente",
          });
        } else {
          res.status(404).json({
            message: "La publicación no existe",
          });
        }
      }
    );
  }
};

const addComment = (req, res) => {
  const { message } = req.body;
  const { id , firstName, lastName } = req?.userTokenInfo?.user;
  const postId = req.params.id;

  if (!message) {
    res.status(200).json({
      message: "Este campo es requerido",
    });
  } else {
    Post.updateOne(
      { _id: postId },
      {
        $push: {
          comments: {
            userId: id,
            firstName: firstName,
            lastName: lastName,
            message: message,
          },
        },
      },
      {},
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Error al agregar el comentario",
          });
        }
        if (result.modifiedCount === 1) {
          res.status(200).json({
            message: "Comentario agregado correctamente",
          });
        } else {
          return res.status(404).json({
            message: "La publicación no existe",
          });
        }
      }
    );
  }
};

const addLike = (req, res) => {  
  const { id , firstName, lastName } = req?.userTokenInfo?.user;
  const postId = req.params.id;
    Post.updateOne(
      { _id: postId },
      {
        $addToSet: {
          likes: {
            userId: id,
            firstName,
            lastName,
          },
        },
      },
      {},
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Error al agregar el like",
          });
        }
        if (result.modifiedCount === 1) {
          res.status(200).json({
            message: "Like agregado correctamente",
          });
        } else {
          return res.status(404).json({
            message: "La publicación no existe",
          });
        }
      }
    );  
};

const deleteLike = (req, res) => {
  const { id } = req?.userTokenInfo?.user;
  const postId = req.params.id;

  console.log(postId);
    Post.updateOne(
      { _id: postId },
      {
        $pull: {
          likes: {
            userId: id,
          },
        },
      },
      {},
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Error al eliminar el like",
          });
        }
        if (result.modifiedCount === 1) {
          res.status(200).json({
            message: "Like eliminado correctamente",
          });
        } else {
          return res.status(404).json({
            message: "La publicación no existe",
          });
        }
      }
    );
};

module.exports = {
  createPost,
  listPosts,
  updatePost,
  addComment,
  addLike,
  deleteLike
};
