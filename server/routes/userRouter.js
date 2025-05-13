const { Router } = require('express');
const { getUserById, updateUser } = require('../controllers/userController');
const { ensureAuthenticated } = require('../controllers/postController');

const userRouter = Router();

userRouter.get('/:id', ensureAuthenticated, getUserById);
userRouter.post('/:id', ensureAuthenticated, updateUser);

module.exports = userRouter;
