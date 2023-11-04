const {
  registerUser,
  loginUser,
  getUserById,
  getUserByName,
  loggedIn,
} = require('../controllers/user');
const requestErrorHandler = require('../middleware/helper');

const router = require('express').Router();

router.post('/register', requestErrorHandler(registerUser));

router.post('/login', requestErrorHandler(loginUser));

router.get('/loggedIn', requestErrorHandler(loggedIn));

router.get('/id/:id', requestErrorHandler(getUserById));

router.get('/name/:user', requestErrorHandler(getUserByName));

module.exports = router;
