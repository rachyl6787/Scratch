const express = require('express');
const path = require('path');

const songKickController = require(path.resolve(
  __dirname,
  '..',
  'controllers',
  'songKickController'
));

const router = express.Router();

router.get(
  '/skapi',
  songKickController.getEventDetails,
  songKickController.eventParser,
  (req, res) => {
    console.log(res.locals.event);
    return res.status(200).send(res.locals.event);
  }
);

module.exports = router;
