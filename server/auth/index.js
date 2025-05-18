const passport = require('passport');
require('./strategies/local');
require('./strategies/google');
const { queryUserById } = require('../db/queries');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await queryUserById(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
