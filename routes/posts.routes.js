const { Router } = require('express');
const { createPost, listPosts } = require('./../controllers/posts.controller');
const authHandler = require('./../middlewares/authHandler');

const router = Router();

router.use(authHandler);

router.get('', listPosts);
router.post('', createPost);


module.exports = router;