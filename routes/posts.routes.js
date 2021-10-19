const { Router } = require('express');
const { createPost, listPosts, addComment, addLike,deleteLike, updatePost } = require('./../controllers/posts.controller');
const authHandler = require('./../middlewares/authHandler');

const router = Router();

router.use(authHandler);

router.get('', listPosts);
router.post('', createPost);
router.put('/:id', updatePost);
router.post('/comments/:id', addComment);
router.post('/likes/:id', addLike);
router.delete('/likes/:id', deleteLike);


module.exports = router;