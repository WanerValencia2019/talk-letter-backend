const { Router } = require('express');
const { createPost, listPosts, addComment, addLike, updatePost } = require('./../controllers/posts.controller');
const authHandler = require('./../middlewares/authHandler');

const router = Router();

router.use(authHandler);

router.get('', listPosts);
router.post('', createPost);
router.put('/:id', updatePost);
router.post('/addComent/:id', addComment);
router.post('/addLike/:id', addLike);


module.exports = router;