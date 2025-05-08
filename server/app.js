require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    store: new pgSession({
      pool,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
);
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('api/', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
