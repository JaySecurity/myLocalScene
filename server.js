const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');

const sassMiddleware = require('node-sass-middleware');
const history = require('./middleware/history');

require('dotenv').config({ path: path.join(__dirname, 'config/.env') });
require('./config/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const venuesRouter = require('./routes/venues');
const artistsRouter = require('./routes/artists');
const eventsRouter = require('./routes/events');
const reviewsRouter = require('./routes/reviews');
const searchRouter = require('./routes/api/search');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
    },
  })
);
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', history, usersRouter);
app.use('/venues', history, venuesRouter);
app.use('/artists', history, artistsRouter);
app.use('/events', history, eventsRouter);
app.use('/api', history, searchRouter);
app.use('/', history, reviewsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
