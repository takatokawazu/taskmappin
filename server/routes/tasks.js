const {
  getAllTasks,
  registerTask,
  completeTask,
} = require('../controllers/task');
const requestErrorHandler = require('../helpers/helper');

const router = require('express').Router();

router
  .route('/')
  .get(requestErrorHandler(getAllTasks))
  .post(requestErrorHandler(registerTask));

router.put('/:id', completeTask);

module.exports = router;
