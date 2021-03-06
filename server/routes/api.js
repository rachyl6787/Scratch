const express = require('express');
const path = require('path');

const songKickController = require(path.resolve(
  __dirname,
  '..',
  'controllers',
  'songKickController'
));

const spotifyController = require(path.resolve(
  __dirname,
  '..',
  'controllers',
  'spotifyController'
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

router.post(
  '/spotapi/get',
  spotifyController.getArtistId,
  spotifyController.getTopTracks,
  spotifyController.buildPlaylist,
  (req, res) => {
    // console.log(res.locals.artistId); // TESTING
    return res.status(200).send(res.locals.topTracks);
  }
);

// **** TEMPORARY ROUTE TO MOCK SONGKICK API **** //
router.get('/data', songKickController.serveJSON, (req, res) => {
  return res.status(200).send(res.locals.data);
});

module.exports = router;
