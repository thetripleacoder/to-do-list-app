// express framework
const express = require('express');

// Router / "mini app"
const router = express.Router();

// controllers
const taskController = require('../controllers/taskController');
const auth = require('../auth');

// task methods(endpoint, controller modules)

router.post(
  '/tasks',
  auth.verify,
  // auth.verifyIsAdmin,
  taskController.createTask
);

// router.get('/tasks',  auth.verify, taskController.getAllTasks);

router.get(
  '/user/tasks',
  auth.verify,
  auth.verifyIsOrdinaryUser,
  taskController.getUserTasks
);

router.get('/tasks/:taskId', auth.verify, taskController.getSpecificTask);

router.put(
  '/tasks/:taskId',
  auth.verify,
  // auth.verifyIsAdmin,
  taskController.editTask
);
router.put(
  '/tasks/complete/:taskId',
  auth.verify,
  // auth.verifyIsAdmin,
  taskController.completeTask
);
router.get(
  '/tasks/completed/admin',
  auth.verify,
  // auth.verifyIsAdmin,
  taskController.getAllCompleteTasks
);
// router.put(
//   '/tasks/activate/:taskId',
//   auth.verify,
//   // auth.verifyIsAdmin,
//   taskController.activateTask
// );
router.delete(
  '/tasks/delete/:taskId',
  auth.verify,
  // auth.verifyIsAdmin,
  taskController.deleteTask
);

module.exports = router;
