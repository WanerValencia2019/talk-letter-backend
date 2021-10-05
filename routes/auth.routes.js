const { Router } = require('express');
const passport = require('passport');
const { register, signinWithEmail, facebookLogin } = require('./../controllers/auth.controller');

const authHandler = require('./../middlewares/authHandler');
const router = Router();
const FacebookTokenStrategy = require("passport-facebook-token");


passport.use('facebook-token',
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
    function (req, accessToken, refreshToken, profile, done) {
      let user = { name: profile._json.name, email: profile._json.email };
      console.log(req);
      return done(true,null, "FALLÓ");
    },
  )
);


router.post('/register', register);
router.post('/signinWithEmail', signinWithEmail);
router.post('/facebook', facebookLogin);

module.exports = router;
