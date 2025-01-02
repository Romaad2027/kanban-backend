const Task = require('../models/task.model');
const Board = require('../models/board.model');
const Track = require('../models/track.model');

// Helper function to handle async requests
const executeAsyncRequest = async (req, res, action) => {
     try {
          await action();
     } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ message: error.message, error });
     }
};

const createNewTask = async (req, res) => {
     const { id: boardId } = req.params;
     const taskData = req.body;

     await executeAsyncRequest(req, res, async () => {
          // Find the board to store the specific task
          const board = await Board.findById(boardId);

          const newTask = new Task({ ...taskData });

          // Add the task's ID to the board's task list
          board.tasks.push(newTask._id);

          await newTask.save();
          await board.save();

          res.status(201).json({ message: `Task Created Successfully in ${board.name}` });
     });
};

const modifyTask = async (req, res) => {
     const { id: taskId } = req.params;
     const taskUpdates = req.body;

     await executeAsyncRequest(req, res, async () => {
          await Task.findByIdAndUpdate(taskId, taskUpdates);
          res.status(200).json({ message: 'Task Updated Successfully' });
     });
};

const removeTask = async (req, res) => {
     const { id: taskId } = req.params;
     const { boardId } = req.body;

     await executeAsyncRequest(req, res, async () => {
          const task = await Task.findById(taskId);
          const board = await Board.findById(boardId);

          // Remove the task reference from the board
          board.tasks = board.tasks.filter((taskIdInBoard) => taskIdInBoard.toString() !== taskId);
          await board.save();

          // Delete all subtasks associated with the task
          try {
               await Promise.all(task.track_ids.map(async (trackId) => await Track.findByIdAndDelete(subtaskId)));
          } catch (error) {
               console.log('Error while deleting subtasks:', error);
               res.status(500).json({ message: 'Error while deleting the Subtasks', error });
               return;
          }

          await Task.findByIdAndDelete(taskId);

          res.status(200).json({ message: 'Task Deleted Successfully' });
     });
};

module.exports = {
     createNewTask,
     modifyTask,
     removeTask,
};
