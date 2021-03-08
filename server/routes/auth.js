const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// post authentication route
router.get(
  '/route',
  authController.setAuthCookie,
  authController.getToken,
  authController.setAccessCookies,
  (req, res) => {
    console.log('cookies set.');
    return res.redirect('/');
  }
);

// route to spotify oauth authentication
router.get('/', authController.spotifyLogin);

module.exports = router;
