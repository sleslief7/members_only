const { Router } = require('express');
const {
  signUp,
  logIn,
  logout,
  getAuthStatus,
  googleLogin,
  googleLoginCallback,
} = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', logIn);
authRouter.post('/logout', logout);
authRouter.get('/check-auth', getAuthStatus);
authRouter.get('/login/google', googleLogin);
authRouter.get('/login/google/callback', googleLoginCallback);

module.exports = authRouter;
