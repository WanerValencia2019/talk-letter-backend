const { Router } = require('express');
const { createCategory, listCategories, updateCategory } = require('./../controllers/category.controller');
const authHandler = require('./../middlewares/authHandler');

const router = Router();

router.use(authHandler);

router.get('', listCategories);
router.post('', createCategory);
router.put('/:id', updateCategory);


module.exports = router;