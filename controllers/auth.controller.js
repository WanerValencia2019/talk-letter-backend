const bycrypt = require("crypto");
const jwt = require("jsonwebtoken");

const { loginFields, registerFields } = require("./../utils/fields");

const User = require("./../models/users.model");

const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  if (!email || !password || !username || !firstName || !lastName) {
    res.status(400).json(registerFields);
  } else {
    let passEncripted = bycrypt
      .createHmac("sha256", password)
      .update("talkLetter")
      .digest("base64");
    const verifyEmail = await User.exists({ email: email });
    const verifyUsername = await User.exists({ username: username });

    if (verifyEmail && verifyUsername) {
      res.status(400).json({
        msg: "Este usuario ya se encuentra registrado",
      });
    } else {
      const user = new User({
        email: email,
        password: passEncripted,
        username: username,
        firstName: firstName,
        lastName: lastName,
      });
      user.save((err, small) => {
        console.log(err);
        if (err) {
          res.status(500).json({
            msg: "Error al registrar el usuario",
          });
        } else {
          res.status(200).json({
            msg: "Usuario creado correctamente",
          });
        }
      });
    }
  }
};

const signinWithEmail = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json(loginFields);
  } else {
    let passEncripted = bycrypt
      .createHmac("sha256", password)
      .update("talkLetter")
      .digest("base64");
    User.findOne({ email, password: passEncripted })
      .exec()
      .then((result) => {
        const { _id, email, username, firstName, lastName } = result;
        let token = jwt.sign({
            user: {
                email,
                username,
            }
        }, jwtSecret ,{ expiresIn: '5000m' });
        res.status(200).json({
          msg: "Has iniciado sesión correctamente",
          token,
          user: {
            _id,
            email,
            username,
            firstName,
            lastName,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          msg: "Credenciales incorrectos",
        });
      });
  }
};

module.exports = {
  register,
  signinWithEmail,
};
