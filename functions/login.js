const fetch = require('node-fetch');
const serverless = require('serverless-http');
const express = require('express');
const querystring = require('querystring');

const authEndpoint = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = process.env.CLIENT_ID;
const responseType = 'code';
const redirectURI = 'http://localhost:8888/login/auth-callback';
const scope = 'user-top-read user-read-private';
const app = express();

app.use(express.json());

app.get('/login', (req, res) => {
  const url = `${authEndpoint}?${querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: redirectURI,
    response_type: responseType,
    scope
  })}`;

  // res.send('Hello World!');
  res.redirect(url);
});

module.exports = app;
module.exports.handler = serverless(app);