require('dotenv').config();
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

const PORT = 3000;
const config = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}
const AUTH_OTPIONS = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://localhost:3000/auth/google/callback'
}

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile', profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OTPIONS, verifyCallback));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
const app = express();

// set security headers
app.use(helmet());
app.use(cookieSession({
  name: 'node-learning-session',
  keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  maxAge: 24 * 60 * 60 * 1000
}));
// initialize paspport for oauth2.0 authentication
app.use(passport.initialize());
app.use(passport.session());
// use static files to send html, css, js files to the client
app.use(express.static(path.join(__dirname, 'public')));
// use json parser to parse request body
app.use(express.json());

// check if user is logged in
const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = req.isAuthenticated() && req.user;
  console.log('req.user', req.user);
  
  if(!isLoggedIn) {
    return res.status(401).send({
      message: 'You are not authenticated!'
    });
  }
  next();
}


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/auth/google', passport.authenticate("google",  {
  scope: ['profile', 'email'] 
}), (req, res) => {
  res.status(200).send({
    message: 'Google authentication successful!'
  });
});
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/failure',
    session: true
  }), (req, res) => {
  // res.status(200).send({
  //   message: 'Google authentication successful!'
  // });
  console.log('Google authentication successful!');
})

app.get('/failure', (req, res) => {
  res.status(200).send({
    message: 'Failed to login!'
  });
});
app.get('/auth/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});

app.get('/secrete', checkLoggedIn, (req, res) => {
  res.status(200).send("This is a highly protected secrete!");
});

https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});