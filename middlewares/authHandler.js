const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({ message: "La peticion no tiene la autorizacion" });
  }
  let token = req.headers.authorization.replace(/['"]+/g, "");

  jwt.verify(token,jwtSecret, (err, decoded) => {
    if (!err) {
      req.userTokenInfo = decoded;
      next();
    } else {
      return res.status(401).send({
        message: "El token no es valido",
        err: err,
      });
    }
  });
};

module.exports = authHandler;