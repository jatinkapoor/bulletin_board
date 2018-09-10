const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressHandleBars = require('express-handlebars');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session');
const bcrypt = require('bcryptjs');
const flash = require('express-flash-messages');
const debug = require('debug');
const config = require('config');

// Routes
const postsRouter = require('./routes/posts');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const homeRouter = require('./routes/home');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const db = require('./models/');
const passportDBConfig = require('./config/passportDB');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(expressValidator());

app.engine('handlebars', expressHandleBars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

let sessionStore = null;

console.log(config.util.getEnv('NODE_ENV'));

if (process.env.NODE_ENV === 'production') {
  sessionStore = new MySQLStore(passportDBConfig.optionsProd);
} else {
  sessionStore = new MySQLStore(passportDBConfig.optionsDev);
}

app.use(session({
  secret: 'qazwsxedc',
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Routing based on paths
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/profile', authenticationMiddleware(), profileRouter);
app.use('/posts', authenticationMiddleware(), postsRouter);
app.use('/logout', logoutRouter);

passport.use(new LocalStrategy(
  (username, password, done) => {
    db.User.findOne({
      where: {
        email: username,
      },
      attributes: ['id', 'username', 'email', 'password'],
    }).then((user) => {
      if (user) {
        const hash = user.password;
        bcrypt.compare(password, hash).then((res) => {
          if (res === true) {
            return done(null, user);
          }
          return done(null, false, {
            message: 'Username or Password Invalid'
          });
        });
      } else {
        return done(null, false, {
          message: 'Username or Password Invalid'
        });
      }
    }).catch((err) => {
      done(err);
    });
  }));

app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.status(404).send("User-agent: *\nDisallow: /");
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

function authenticationMiddleware() {
  return (req, res, next) => {
    debug(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
    if (req.isAuthenticated()) return next();
    req.flash('error', 'You need to be logged in to view this page');
    res.redirect('/login');
  };
}

module.exports = app;
