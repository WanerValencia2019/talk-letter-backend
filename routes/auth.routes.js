const { Router } = require('express');
const passport = require('passport');
const { register, signinWithEmail, facebookLogin, signinAdmin } = require('./../controllers/auth.controller');

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
router.post('/signinAdmin',signinAdmin);
router.post('/facebook', facebookLogin);

module.exports = router;
