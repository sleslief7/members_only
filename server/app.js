require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('./auth');
const sessionMiddleware = require('./auth/session');

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : 0);
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
