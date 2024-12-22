const express = require('express');
const { createNewTask, modifyTask, removeTask } = require('../controllers/task.controller');
const taskRouter = express.Router();

// ! Pass the board's id in param's of the URL to add task in it
taskRouter.post("/:id", createNewTask)

// ! Update specific Task by passing the id of the task in the URL param and the changes in the req-body
taskRouter.patch('/:id', modifyTask)

// ! Delete specific Task by passing the id of the task in the URL param and 'boardId' key in req-body
taskRouter.delete('/:id', removeTask)



module.exports = taskRouter;