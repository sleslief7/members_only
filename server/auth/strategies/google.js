require('dotenv').config;
const passport = require('passport');
const { findOrCreateGoogleUser } = require('../../db/queries');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/login/google/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const userInput = {
        googleId: profile.id,
        username: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
      };
      try {
        const user = await findOrCreateGoogleUser(userInput);
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
