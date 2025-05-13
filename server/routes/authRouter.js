const { Router } = require('express');
const { signUp, logIn } = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', logIn);

module.exports = authRouter;
