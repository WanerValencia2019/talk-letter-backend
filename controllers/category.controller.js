const Category = require("./../models/category.models");

const listCategories = (req, res) => {
  Category.find({}, { __v: 0 }, (err, result) => {
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

const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      name: "Este campo es requerido",
    });
  } else {
    const category = new Category({ name: name });
    category.save((err, result) => {
      console.log(err);
      if (err) {
        res.status(500).json({
          message: "Error al registrar la categoría",
        });
      } else {
        res.status(200).json({
          message: "Categoría creada correctamente",
        });
      }
    });
  }
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name || !id) {
    res.status(400).json({
      id: "Este campo es requerido",
      name: "Este campo es requerido",
    });
  } else {
    Category.updateOne({ _id: id }, { name: name }, {}, (err, result) => {
      console.log(result);
      if (err) {
        return res.status(500).json({
          message: "Error al actualizar la categoría",
        });
      } else {
        res.status(200).json({
          message: "Categoría actualizada correctamente",
        });
      }
    });
  }
};

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
};
