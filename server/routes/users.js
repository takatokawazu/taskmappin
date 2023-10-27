const {
  registerUser,
  loginUser,
  getUserById,
  getUserByName,
} = require('../controllers/user');
const requestErrorHandler = require('../helpers/helper');

const router = require('express').Router();

router.post('/register', requestErrorHandler(registerUser));

router.post('/login', requestErrorHandler(loginUser));

router.get('/id/:id', requestErrorHandler(getUserById));

router.get('/name/:user', requestErrorHandler(getUserByName));

module.exports = router;
