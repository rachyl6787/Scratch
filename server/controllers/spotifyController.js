const fetch = require('node-fetch');
const token =
  'BQCXCLRN0lVvlDSe7Jf3C_vDRujRgmKeQqbQlfkiadkLKSlSCWi2xnyjzvURdU-FBLkRvrE32iCzDVbSDTQ1P55M359bXDqLY_jrDPok0zJ10-vcl2uBYivKnAVen84BdemaCPF4OZngYHJ-6SuVk3YaSRYWv3xEqdJEPqSNN_cD-G7RcWAZtNmUbjpkVStPj9PmxjHPOZRBzOnyd5UKwY17Bdb5h3bs';

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

  //get top tracks
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

  // wait for all top tracks
  Promise.all(promiseArr)
    .then(() => {
      res.locals.topTracks = topTracks;
      console.log('getTopTracks finished.');
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getTopTracks:Promise.All middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

spotifyController.buildPlaylist = (req, res, next) => {
  console.log('buildPlaylist fired...');

  const newPlaylist = {
    name: 'New Playlist',
    description: 'New playlist description',
    public: false,
  };

  // get user id
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
      // create an empty playlist
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
          console.log('empty playlist created');
          const playlistId = data.id;
          const JSONbody = JSON.stringify({ uris: res.locals.topTracks });
          console.log('JSONbody', JSONbody);

          // seed playlist with tracks - 100 Max ////////////////////////////// FIX MAX LATER
          fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSONbody,
          }).then((res) => console.log(res));
          // .then((data) => {
          //   console.log('playlist seeded.');
          //   console.log(data);
          //   // res.locals.playlistId = data;
          //   return next();
          // });

          // console.log('what');
          // return next();
        });
    });
};

module.exports = spotifyController;
