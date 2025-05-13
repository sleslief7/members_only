const { queryCreateUser } = require('../db/queries');
const bcrypt = require('bcrypt');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;
  if (!firstName || !lastName || !userName || !password) {
    return res
      .status('400')
      .json({ status: 'fail', message: 'All fields are required.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { firstName, lastName, userName, password: hashedPassword };
  const user = await queryCreateUser(userData);

  res.status(201).json(user);
});

const logIn = (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/api/posts',
    failureRedirect: '/api/login',
  });
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ status: 'fail', message: 'Unauthorized' });
};

module.exports = { signUp, logIn, ensureAuthenticated };
