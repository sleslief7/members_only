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
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'Logged in' });
    });
  })(req, res, next);
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ status: 'fail', message: 'Unauthorized' });
};

module.exports = { signUp, logIn, ensureAuthenticated };
