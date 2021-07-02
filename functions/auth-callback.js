const serverless = require('serverless-http');
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const authEndpoint = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirectURI = 'http://localhost:8888/login/auth-callback';
const app = express();

app.use(express.json());

app.get('/login/auth-callback', (req, res) => {
  const code = req.query.code;
  const error = req.query.error;
  
  // TODO: ERROR HANDLING
  // Can I send the error from Spotify and a response code?
  if (error) {
    res.send(error);
    return;
  }

  // TODO: Do a req.post here?
  // Exchange code for an access token using a POST request to 'https://accounts.spotify.com/api/token'
  const authParams = querystring.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: redirectURI,
    grant_type: 'authorization_code',
    code
  });
  axios.post(authEndpoint, authParams)
  .then(response => {
    // can i send a response back to the browser here?
    console.log(response);
    const {access_token, refresh_token} = response.data;
    res.redirect(`/?${querystring.stringify({access_token, refresh_token})}`);
  })
  .catch(error => {
    console.error(error);
  });

  // res.send(req.query.code);
  // res.send(req.query.error); 
  //res.redirect(url);
});

module.exports = app;
module.exports.handler = serverless(app);
