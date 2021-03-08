const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const songKickController = {};

songKickController.getEventDetails = (req, res, next) => {
  console.log('getEntryDetails fired');
  const eventId = req.query.id;
  fetch(`http://localhost:3001/api/data/?id=${eventId}`)
    .then((res) => res.json())
    .then((data) => {
      res.locals.data = data.resultsPage.results.event;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getEventDetails middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

songKickController.eventParser = (req, res, next) => {
  console.log('eventParser fired');
  const sk = res.locals.data;

  const festivalDetails = {
    id: sk.id,
    url: sk.uri,
    festName: sk.displayName,
    date: { start: sk.start.date, end: sk.end.date },
    venue: sk.venue.displayName,
    city: sk.location.city,
    artists: [],
  };
  sk.performance.forEach((artist) => {
    festivalDetails.artists.push(artist.displayName);
  });

  res.locals.event = festivalDetails;
  return next();
};

// **** TEMPORARY CONTROLLER FOR FAKING SONGKICK API **** //
songKickController.serveJSON = (req, res, next) => {
  console.log('serveJSON fired');
  const dataDir = path.resolve(__dirname, '../data/json');
  const eventId = req.query.id;
  fs.readFile(`${dataDir}/${eventId}.json`, (err, data) => {
    data = JSON.parse(data);
    res.locals.data = data;
    return next();
  });
};

module.exports = songKickController;
