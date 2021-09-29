const { Router } = require('express');
const { register, signinWithEmail } = require('./../controllers/auth.controller');

const authHandler = require('./../middlewares/authHandler');

const router = Router();


router.post('/register', register);
router.post('/signinWithEmail', signinWithEmail);

module.exports = router;
