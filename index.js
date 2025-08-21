require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const path = require('path');
const connectDB = require('./utils/connect');
const {
  authRouter,
  categoryRouter,
  productRouter,
  userRouter,
  orderRouter,
  reviewRouter,
} = require('./routes');
const { local } = require('./auth');

const PORT = process.env.PORT ?? 3000;
const SECRET = process.env.SECRET ?? 'AStrongSecret';

connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cookieParser(SECRET));
    app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: SECRET,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/static', express.static(path.join(__dirname, './public')));

    // Serialize-Deserialize

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    passport.use('local', local);

    app.get('/', (req, resp) => {
      resp.send('Welcome to Book Management APIs');
    });

    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/categories', categoryRouter);
    app.use('/api/v1/products', productRouter);
    app.use('/api/v1/reviews', reviewRouter);
    app.use('/api/v1/orders', orderRouter);

    app.use('*', (req, resp) => {
      resp.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    });

    app.use((err, req, resp) => {
      console.log(err);
      resp
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err?.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
    });

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  })
  .catch((err) => {
    console.log(`Error while connecting. Reason: ${err.message}`);
  });
