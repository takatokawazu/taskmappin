const { registerUser, loginUser } = require('../controllers/user');
const requestErrorHandler = require('../helpers/helper');

const router = require('express').Router();

router.post('/register', requestErrorHandler(registerUser));

router.post('/login', requestErrorHandler(loginUser));

module.exports = router;
