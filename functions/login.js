const fetch = require('node-fetch');
const serverless = require('serverless-http');
const express = require('express');
const querystring = require('querystring');

const authEndpoint = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = process.env.CLIENT_ID;
const responseType = 'code';
const redirectURI = 'http://localhost:8888/login/auth-callback';
const app = express();

app.use(express.json());

app.get('/login', (req, res) => {
  const url = `${authEndpoint}?${querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: redirectURI,
    response_type: responseType
  })}`;

  // res.send('Hello World!');
  res.redirect(url);
});

module.exports = app;
module.exports.handler = serverless(app);

// exports.handler = async(e) => {
//   const path = `${authEndpoint}?client_id=${CLIENT_ID}&response_type=${responseType}&redirect_uri=${redirectURI}`;
  
//   try {
//     const response = await fetch(path, {method: 'GET'});
//     const data = await response.json();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(data)
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }