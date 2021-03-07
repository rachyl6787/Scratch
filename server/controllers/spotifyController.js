const fetch = require('node-fetch');
const token = process.env.CLIENT_TOKEN;

spotifyController = {};

spotifyController.getArtistId = (req, res, next) => {
  console.log('getArtistId fired...');
  const { artists } = req.body;

  const artistId = {};
  const promiseArr = [];

  // get artist ids
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

  // wait for all artist ids
  Promise.all(promiseArr)
    .then(() => {
      res.locals.artistId = artistId;
      console.log('getArtistId finished.');
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getArtistId:Promise.all middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

spotifyController.getTopTracks = (req, res, next) => {
  console.log('getTopTracks fired...');

  const artistIds = Object.values(res.locals.artistId);
  const promiseArr = [];
  const topTracks = [];

  // get top tracks
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
          for (let i = 0; i < 3; i++) {
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

  // wait for all top tracks
  Promise.all(promiseArr)
    .then(() => {
      res.locals.topTracks = topTracks;
      console.log('getTopTracks finished.');
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getTopTracks:Promise.all middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

spotifyController.buildPlaylist = (req, res, next) => {
  console.log('buildPlaylist fired...');
  const { festival } = req.body;

  const newPlaylist = {
    name: `${festival} Playlist`,
    description: 'curated by __card',
    public: false,
  };

  // getUserId - get user id
  fetch('https://api.spotify.com/v1/me', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const userId = data.id;
      console.log('userId gotten.');

      // createEmptyPlaylist - create an empty playlist
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPlaylist),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('empty playlist created.');

          const playlistId = data.id;
          const { topTracks } = res.locals;

          const promiseArr = [];

          // seedPlaylist - seed playlist with tracks - 100 at a time
          for (let i = 0; i < topTracks.length; i += 100) {
            const JSONbody = JSON.stringify({
              uris: topTracks.slice(i, i + 100),
            });

            promiseArr.push(
              fetch(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSONbody,
                }
              ).catch((err) => {
                return next({
                  log: `Error in buildPlaylist:seedPlaylist:fetch middleware: ${err}`,
                  message: { err: 'An error occurred' },
                });
              })
            );
          }

          Promise.all(promiseArr)
            .then(() => {
              console.log('playlist seeded.');
              return next();
            })
            .catch((err) => {
              return next({
                log: `Error in buildPlaylist:seedPlaylist:Promise.all middleware: ${err}`,
                message: { err: 'An error occurred' },
              });
            });
        })
        .catch((err) => {
          return next({
            log: `Error in buildPlaylist:createEmptyPlaylist middleware: ${err}`,
            message: { err: 'An error occurred' },
          });
        });
    })
    .catch((err) => {
      return next({
        log: `Error in buildPlaylsit:getUserId middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = spotifyController;
