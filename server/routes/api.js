const express = require('express');
const path = require('path');

const songKickController = require(path.resolve(
  __dirname,
  '../controllers/SongKickController'
));

const spotifyController = require(path.resolve(
  __dirname,
  '../controllers/SpotifyController'
));

const router = express.Router();

// SongKick API Routing
router.get(
  '/skapi',
  songKickController.getEventDetails,
  songKickController.eventParser,
  (req, res) => {
    return res.status(200).send(res.locals.event);
  }
);

// Spotify API Routing
router.post(
  '/spotapi',
  spotifyController.getArtistId,
  spotifyController.getTopTracks,
  spotifyController.buildPlaylist,
  (req, res) => {
    return res.status(200).send(res.locals.snapshot);
  }
);

// **** TEMPORARY ROUTE TO MOCK SONGKICK API **** //
router.get('/data', songKickController.serveJSON, (req, res) => {
  return res.status(200).send(res.locals.data);
});

module.exports = router;
