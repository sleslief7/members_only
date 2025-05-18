require('dotenv').config;
const { queryCreateUser } = require('../db/queries');
const bcrypt = require('bcrypt');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  if (!firstName || !lastName || !username || !password) {
    return res
      .status('400')
      .json({ status: 'fail', message: 'All fields are required.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { firstName, lastName, username, password: hashedPassword };
  await queryCreateUser(userData);

  res.status(201).json({ message: 'Successfully signed up' });
});

const logIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: info?.message || 'Login failed' });
    }

    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);

    //res.redirect('/');
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out' });
    });
  });
};

const googleLogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
};

const googleLoginCallback = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: info?.message || 'Login failed' });
    }

    req.logIn(user, function (err) {
      if (err) return next(err);

      res.redirect(`${process.env.CLIENT_URL}/`);
    });
  })(req, res, next);
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ status: 'fail', message: 'Unauthorized' });
};

const getAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuth: true, user: req.user });
  }
  res.status(201).send();
};

module.exports = {
  signUp,
  logIn,
  logout,
  googleLogin,
  googleLoginCallback,
  ensureAuthenticated,
  getAuthStatus,
};
