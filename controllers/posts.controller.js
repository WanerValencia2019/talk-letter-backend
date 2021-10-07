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
  const user = req?.userTokenInfo?.user;
  if (!created_by || !categories || !title || !content) {
    res.status(400).json({
      ...postFields,
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
  const { userId, firstName, LastName, message } = req.body;
  const { id } = req.params;

  if (!userId || !message || !firstName || !LastName) {
    res.status(200).json({
      userId: "Este campo es requerido",
      message: "Este campo es requerido",
      firstName: "Este campo es requerido",
      LastName: "Este campo es requerido",
    });
  } else {
    Post.updateOne(
      { _id: id },
      {
        $push: {
          comments: {
            userId: userId,
            firstName: firstName,
            LastName: LastName,
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
  const { userId, firstName, LastName } = req.body;
  const { id } = req.params;

  if (!userId || !firstName || !LastName) {
    res.status(200).json({
      userId: "Este campo es requerido",
      firstName: "Este campo es requerido",
      LastName: "Este campo es requerido",
    });
  } else {
    Post.updateOne(
      { _id: id },
      {
        $addToSet: {
          likes: {
            userId: userId,
            firstName: firstName,
            LastName: LastName,
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
  }
};

module.exports = {
  createPost,
  listPosts,
  updatePost,
  addComment,
  addLike,
};
