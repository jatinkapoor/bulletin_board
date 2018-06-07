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

// Routes
const postsRouter = require('./routes/posts');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const homeRouter = require('./routes/home');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const db = require('./models/');

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

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'hello123',
  database: 'bulletin_board',
};

const sessionStore = new MySQLStore(options);
app.use(session({
  secret: 'qazwsxedc',
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated();
//   next();
// });



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
          return done(null, false);
        });
      } else {
        return done(null, false);
      }
    }).catch((err) => {
      done(err);
    });
  }));


app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
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
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  };
}

module.exports = app;
