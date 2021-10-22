const  User  = require('./../models/users.model');



const listUsers = (req, res) => {
  const  role = req?.userTokenInfo?.user?.role;
  if(role !== 'admin'){
  	res.status(403).json({
  		message: 'No estás autorizado para esta acción',
  	})  	
  }
  User.find({}, { __v: 0 }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
      });
    }
    res.status(200).json(result);
  });
};

const deleteUser = (req, res) => {
  const  role = req?.userTokenInfo?.user?.role;
  const { id } = req.params;

  if(role !== 'admin'){
  	res.status(403).json({
  		message: 'No estás autorizado para esta acción',
  	})  	
  }
  User.deleteOne({_id: id})
  .then((result)=>{
  	res.status(200).json({
  		message: "Usuario eliminado correctamente",
  	})
  })
  .catch((err)=>{
  	 res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
     });
  })
};



module.exports = {
	listUsers,
	deleteUser,	
}