const { Router } = require('express');
const { createUser } = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/sign-up', createUser);

module.exports = authRouter;
