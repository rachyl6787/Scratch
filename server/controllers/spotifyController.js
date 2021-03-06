const path = require('path');
const fetch = require('node-fetch');
const { nextTick } = require('process');

spotifyController = {};

spotifyController.getArtistId = (req, res, next) => {
  console.log('getArtistId fired');
  const { artists } = req.body;

  const artistId = {};
  const promiseArr = [];

  artists.forEach((artist) => {
    const artistURL = new URL(
      `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`
    );
    promiseArr.push(
      fetch(artistURL, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer BQBvAqzpXdPQTFrZ-Sn4TT0hWlzMqZVtXztUd36H-0MrNYsv6YBL7TsQr4eUOGnFcmJ0AfukDRfjmnX4BKSvigwXYHY5X0Um8MDZWC2BS0ZdSM3qLxXtw-7OPIjOvaJC6ueiWUSe7VaIgHB8An6o-ERJ2JCQtDR5f2s`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          artistId[artist] = data.artists.items[0].id;
        })
        .catch((err) => {
          return next({
            log: `Error in getArtistId:fetch middleware: ${err}`,
            message: { err: 'An error occurred' },
          });
        })
    );
  });

  Promise.all(promiseArr)
    .then(() => {
      res.locals.artistId = artistId;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getArtistId:Promise.All middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = spotifyController;
