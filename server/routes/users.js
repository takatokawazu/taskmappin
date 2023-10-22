const { registerUser, loginUser, getUserById } = require('../controllers/user');
const requestErrorHandler = require('../helpers/helper');

const router = require('express').Router();

router.post('/register', requestErrorHandler(registerUser));

router.post('/login', requestErrorHandler(loginUser));

router.get('/:id', requestErrorHandler(getUserById));

module.exports = router;
