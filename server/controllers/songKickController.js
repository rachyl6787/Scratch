const path = require('path');
const fs = require('fs');

const songKickController = {};

songKickController.getEventDetails = (req, res, next) => {
  console.log('getEntryDetails fired');
  fs.readFile('server/data/json/outside-lands.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    res.locals.data = data;
    return next();
  });
};

songKickController.eventParser = (req, res, next) => {
  console.log('eventParser fired');
  const sk = res.locals.data;
  const festivalDetails = {
    url: sk.uri,
    festName: sk.displayName,
    date: { start: sk.start.date, end: sk.end.date },
    venue: sk.venue.displayName,
    city: sk.location.city,
    artists: [],
  };
  // const festivalDetails = {};
  // const data = res.locals.data;
  // festivalDetails.url = data.uri;
  // festivalDetails.festName = data.displayName;
  // festivalDetails.date = { start: data.start.date, end: data.end.date };
  // festivalDetails.venue = data.venue.displayName;
  // festivalDetails.city = data.location.city;
  // festivalDetails.artists = [];
  sk.performance.forEach((artist) => {
    festivalDetails.artists.push(artist.displayName);
  });
  res.locals.event = festivalDetails;
  return next();
};

module.exports = songKickController;
