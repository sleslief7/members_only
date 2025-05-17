require('dotenv').config();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('../db/pool');

const sessionMiddleware = session({
  store: new pgSession({
    pool,
    tableName: 'session',
    createTableIfMissing: true,
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

module.exports = sessionMiddleware;
