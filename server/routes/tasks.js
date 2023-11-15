const {
  getAllTasks,
  registerTask,
} = require('../controllers/task');
const requestErrorHandler = require('../middleware/helper');

const router = require('express').Router();

router
  .route('/')
  .get(requestErrorHandler(getAllTasks))
  .post(requestErrorHandler(registerTask));


module.exports = router;
