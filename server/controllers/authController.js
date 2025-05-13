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

const logIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ status: 'fail', message: 'Unauthorized' });
};

module.exports = { signUp, logIn, ensureAuthenticated };
