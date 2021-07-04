const serverless = require('serverless-http');
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const authEndpoint = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const app = express();

app.use(express.json());

app.post('/login/refresh-token', (req, res) => {
  console.log(req.body);
  const refreshParams = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: req.body.refreshToken
  });
  const buffer = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const base64String = buffer.toString('base64');
  const headers = {Authorization: `Basic ${base64String}`};
  const refreshConfig = { headers };

  axios.post(authEndpoint, refreshParams, refreshConfig)
  .then(response => {
    console.log(response.data);
    res.send(response.data);
  })
  .catch(error => {
    console.error(error);
  });
});

module.exports = app;
module.exports.handler = serverless(app);