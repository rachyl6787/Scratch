const express = require('express');
const path = require('path');
const cookieController = require('../controllers/cookieController');
// const redirect_uri = 'http://localhost:8080/api/route/'
const redirect_uri = 'http://localhost:8080/'
const id = process.env.CLIENT_ID;
const songKickController = require(path.resolve(
  __dirname,
  '..',
  'controllers',
  'songKickController'
));

const router = express.Router();

router.get(
  '/skapi',
  songKickController.getEventDetails,
  songKickController.eventParser,
  (req, res) => {
    console.log(res.locals.event); // CONSOLE LOG FOR TESTING
    return res.status(200).send(res.locals.event);
  }
);

// **** TEMPORARY ROUTE TO MOCK SONGKICK API **** //
router.get('/data', songKickController.serveJSON, (req, res) => {
  return res.status(200).send(res.locals.data);
});


// // Spotify oAuth Router 
// router.get('/login', (req, res) => {
//   console.log('Finally hit this oAuth middleware');
//   //will need to add more scopes depending on what we want for functionality
//   var scopes = 'playlist-modify-public user-read-email user-read-private';
//   res.redirect(
//     'https://accounts.spotify.com/authorize' +
//       '?response_type=code' +
//       '&client_id=' +
//       id +
//       (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//       '&redirect_uri=' +
//       encodeURIComponent(redirect_uri)
//   );
// });

// router.get('/route', cookieController.setCookie, (req, res)=> {
//   console.log('cookieController fired...');
//   return res
//     .status(200)
//     .sendFile(path.resolve(__dirname, '..', '..', 'client', 'index.html'));
// })

module.exports = router;
