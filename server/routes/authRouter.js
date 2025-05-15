const { Router } = require('express');
const {
  signUp,
  logIn,
  getAuthStatus,
} = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', logIn);
authRouter.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);

    //res.redirect('/');
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out' });
    });
  });
});
authRouter.get('/check-auth', getAuthStatus);

module.exports = authRouter;
