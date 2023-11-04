const {
  getAllTasks,
  registerTask,
  completeTask,
} = require('../controllers/task');
const requestErrorHandler = require('../middleware/helper');

const router = require('express').Router();

router
  .route('/')
  .get(requestErrorHandler(getAllTasks))
  .post(requestErrorHandler(registerTask));

router.put('/:id', completeTask);

module.exports = router;
