const express = require('express');
const router = express.Router();
const taskController = require('../taskcontroller');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.addTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.removeTask);

module.exports = router;
