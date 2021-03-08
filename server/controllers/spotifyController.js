const fetch = require('node-fetch');
// const token = process.env.USER_TOKEN;

spotifyController = {};

spotifyController.getArtistId = (req, res, next) => {
  console.log('getArtistId fired...');
  const { artists, token } = req.body;

  const artistId = {};
  const promiseArr = [];

  // get artist ids
  artists.forEach((artist) => {
    const artistUri = encodeURIComponent(artist);
    const artistUrl = `https://api.spotify.com/v1/search?q=${artistUri}&type=artist&limit=1`;

    promiseArr.push(
      fetch(artistUrl, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'adatapplication/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status >= 400)
            return next({
              log: `Error in getArtistId:fetch middleware: ${res.status}: ${res.statusText}`,
              message: { err: 'An error occurred' },
            });
          return res.json();
        })
        .then((data) => {
          if (data.artists.items.length !== 0)
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

  const { token } = req.body;
  const artistIds = Object.values(res.locals.artistId);
  const promiseArr = [];
  const topTracks = [];

  // get top tracks
  artistIds.forEach((artistId) => {
    const artistIdUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?=market=US`;

    promiseArr.push(
      fetch(artistIdUrl, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status >= 400)
            return next({
              log: `Error in getTopTracks:fetch middleware: ${res.status}: ${res.statusText}`,
              message: { err: 'An error occurred' },
            });
          return res.json();
        })
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

spotifyController.getUserId = (req, res, next) => {
  console.log('getUserId fired...');

  const { token } = req.body;

  fetch('https://api.spotify.com/v1/me', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status >= 400)
        return next({
          log: `Error in getUserId middleware: ${res.status}: ${res.statusText}`,
          message: { err: 'An error occurred' },
        });
      return res.json();
    })
    .then((data) => {
      res.locals.userId = data.id;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getUserId middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

spotifyController.createEmptyPlaylist = (req, res, next) => {
  console.log('createEmptyPlaylist fired...');

  const { festival, token } = req.body;
  const { userId } = res.locals;

  const newPlaylist = {
    name: `${festival} Playlist`,
    description: 'curated by __card',
    public: false,
  };

  fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPlaylist),
  })
    .then((res) => {
      if (res.status >= 400)
        return next({
          log: `Error in createEmptyPlaylist middleware: ${res.status}: ${res.statusText}`,
          message: { err: 'An error occurred' },
        });
      return res.json();
    })
    .then((data) => {
      res.locals.playlistId = data.id;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in createEmptyPlaylist middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

spotifyController.seedPlaylist = (req, res, next) => {
  console.log('seedPlaylist fired...');

  const { topTracks, playlistId } = res.locals;
  const { token } = req.body;

  const promiseArr = [];

  // seedPlaylist - seed playlist with tracks - 100 at a time
  for (let i = 0; i < topTracks.length; i += 100) {
    const JSONbody = JSON.stringify({
      uris: topTracks.slice(i, i + 100),
    });

    promiseArr.push(
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSONbody,
      })
        .then((res) => {
          if (res.status >= 400)
            return next({
              log: `Error in seedPlaylist middleware: ${res.status}: ${res.statusText}`,
              message: { err: 'An error occurred' },
            });
        })
        .catch((err) => {
          return next({
            log: `Error in seedPlaylist:fetch middleware: ${err}`,
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
        log: `Error in seedPlaylist:Promise.all middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = spotifyController;

//Write a query to SELECT all the data from the artists table

//Convert from JSON to object.
//Store that data into a variable, localArtists

//Iterate through the artists array from req.body (MEMOIZE)
//Check localArtists to see if the artist exists
//If so, get the spotifyArtistId from this artist
//Save from spotify - artistId = {}, artistId[artist_name] = spotify_artist_id
//If the artist doesn't exist
//Fetch the artist data from the API call
//Store the artists data into our localArtists cache
// toSave = {}, artistId[artist_name] = spotify_artist_id
//Get the spotifyArtistId from this artist
//Save that spotifyArtistId to artistId[artist] in res.locals

// save into object
// as we get responses, save into cache object

// parse object into string
// let string = '';
// iterate over keys in object
// for (let key of Object.keys(cache))
// string += `(${key},${cache[key]}),`
// string = string.splice(string.length-1, ';')

// INSERT INTO db.artists ( artist_name, spotify_artist_id )
// VALUES ( 'The Killers', '123ABC' ), ( 'Young Thug', 'ABC123' );g
