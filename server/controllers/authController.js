const {
  queryCreateUser,
  queryUserByUsername,
  queryUserById,
} = require('../db/queries');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
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

const initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await queryUserByUsername(username);
        if (!user) {
          return done(null, false, { message: 'No user with that username' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Password incorrect' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await queryUserById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};

module.exports = { createUser, initializePassport };
