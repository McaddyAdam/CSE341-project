const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.Port || 2;
const app = express();

app
  .use(bodyParser.json())
  .use(session({ secret: 'secret', resave: false, saveUninitialized: true }))
  // this is the basic express session({..}) initialization.
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  // allow passport to use "express-session".
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, PATCH, OPTIONS, DELETE'
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes/index.js'));




  passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged Out'
  )
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(
        `I'm listening on port number ${process.env.port || port}!!!!!!!!`
      );
    });
  }
});

