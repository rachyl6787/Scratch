const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3001;
require('dotenv').config('./.env');
const id = process.env.CLIENT_ID;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/build', express.static(path.resolve(__dirname, '..', 'build')));

const apiRouter = require(path.resolve(__dirname, 'routes', 'api'));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

app.get('/login', (req, res) => {
  //will need to add more scopes depending on what we want for functionality
  var scopes = 'playlist-modify-public user-read-email user-read-private'; 
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
