const { Router } = require('express');
const { listUsers, deleteUser } = require('./../controllers/users.controller');
const authHandler = require('./../middlewares/authHandler');

const router = Router();

router.use(authHandler);

router.get('', listUsers);
router.delete('/:id',deleteUser);
// router.post('', createCategory);
// router.put('/:id', updateCategory);


module.exports = router;