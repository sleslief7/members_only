const passport = require('passport');
const { getFullUserByUsername } = require('../../db/queries');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getFullUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'No user with that username' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Password incorrect' });
      }

      user.password = undefined;

      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);
