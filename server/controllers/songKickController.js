const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const db = require('../models/festivalModels');
const songKickController = {};

songKickController.getEventDetails = (req, res, next) => {
  console.log('getEntryDetails fired');
  const eventId = req.query.id;
  fetch(`http://localhost:3001/api/data/?id=${eventId}`)
    .then((res) => {
      if (res.status >= 400)
        return next({
          log: `Error in getEventDetails middleware: ${res.status}: ${res.statusText}`,
          message: { err: 'An error occurred' },
        });
      return res.json();
    })
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


//Add method to add user selected festivals to saved database. 
//Should render in YourEvents
songKickController.addFestival = (req, res, next) => {
  const f = req.body;
  //Currently DB only has two fields for Festivals, id(auto-increment) and name
  const sql = ` INSERT INTO Festival (name)
                VALUES ('${f.name}')
                RETURNING *`;

  db.query(sql)
    .then((dbRes) => {
      res.locals.newFestival = dbRes.rows;
      next();
    })
    .catch((err) => {
      next({
        log: `Error in addFestival middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
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
