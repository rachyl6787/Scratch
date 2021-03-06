const fetch = require('node-fetch');
const token =
  'BQC0m6wkmr_3W4ziYhM7RlDgYKrBxzPZ-VORLfIrmAJVNQ0pFA0FcP9QR1DZoN_XFTq1G3jgb9hDkBzKY1yHetqb5UnhqgEhwPTS-oN38QDtUDO-nboFPuF65oIqXmyh25HUlvpfehc8GWjmh9BhKSY6szpI_c0wchM';

spotifyController = {};

spotifyController.getArtistId = (req, res, next) => {
  console.log('getArtistId fired');
  const { artists } = req.body;

  const artistId = {};
  const promiseArr = [];

  artists.forEach((artist) => {
    const artistUrl = new URL(
      `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`
    );

    promiseArr.push(
      fetch(artistUrl, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'adatapplication/json',
          Authorization: `Bearer ${token}`,
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

spotifyController.getTopTracks = (req, res, next) => {
  console.log('getTopTracks fired');

  const artistIds = Object.values(res.locals.artistId);
  const promiseArr = [];
  const topTracks = [];

  artistIds.forEach((artistId) => {
    const artistIdUrl = `	https://api.spotify.com/v1/artists/${artistId}/top-tracks?=market=US`;

    promiseArr.push(
      fetch(artistIdUrl, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          for (let i = 0; i < 2; i++) {
            topTracks.push(data.tracks[i].uri);
          }
        })
        .catch((err) => {
          return next({
            log: `Error in getTopTracks:fetch middleware: ${err}`,
            message: { err: 'An error occurred' },
          });
        })
    );
  });

  Promise.all(promiseArr)
    .then(() => {
      res.locals.topTracks = topTracks;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getTopTracks:Promise.All middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = spotifyController;
