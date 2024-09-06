require('dotenv').config();
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const PORT = 3000;
const config = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
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
const app = express();

app.use(helmet());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = true;
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
    session: false
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
  res.status(200).send({
    message: 'Google authentication successful!'
  });
});

app.get('/secrete', checkLoggedIn, (req, res) => {
  res.json({ message: 'Hello from server!' });
});

https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});