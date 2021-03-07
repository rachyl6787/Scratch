const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/route', authController.setCookie, (req, res) => {
  console.log('cookie set.');
  return res.redirect('/');
});

router.get('/', authController.spotifyLogin);

module.exports = router;
