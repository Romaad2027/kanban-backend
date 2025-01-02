const Task = require('../models/task.model');
const Board = require('../models/board.model');

// Helper function to handle async requests
const executeAsyncRequest = async (req, res, action) => {
     try {
          await action();
     } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ message: error.message, error });
     }
};

const fetchAllBoards = async (req, res) => {
     console.log('fetch all boards')
     const { userId } = req.headers;

     await executeAsyncRequest(req, res, async () => {
          const boards = await Board.find({ user: userId }).select(['-user', '-tasks', '-v']);
          res.status(200).json(boards);
     });
};

const fetchBoardDetails = async (req, res) => {
     const { userId } = req.headers;
     const { id: boardId } = req.params;

     await executeAsyncRequest(req, res, async () => {
          const board = await Board.findOne({ _id: boardId, user: userId }).populate({
               path: 'tasks',
               populate: {
                    path: 'subtask',
               },
          });
          res.status(200).json(board);
     });
};

const createNewBoard = async (req, res) => {
     const { userId } = req.headers;

     await executeAsyncRequest(req, res, async () => {
          const newBoard = new Board({ ...req.body, user: userId });
          await newBoard.save();
          res.status(201).json({ message: 'Board Created Successfully' });
     });
};

const modifyBoard = async (req, res) => {
     const { id: boardId } = req.params;
     const updatedData = req.body;

     await executeAsyncRequest(req, res, async () => {
          await Board.findByIdAndUpdate(boardId, updatedData);
          res.status(200).json({ message: 'Board Updated Successfully' });
     });
};

const removeBoard = async (req, res) => {
     const { id: boardId } = req.params;

     await executeAsyncRequest(req, res, async () => {
          const board = await Board.findById(boardId);

          // Delete tasks and associated subtasks
          const taskDeletionPromises = board.tasks.map(async (taskId) => {
               const task = await Task.findById(taskId);
               await Task.findByIdAndDelete(taskId);
          });

          await Promise.all(taskDeletionPromises);

          await Board.findByIdAndDelete(boardId);
          res.status(200).json({ message: 'Board Deleted Successfully' });
     });
};

module.exports = {
     fetchAllBoards,
     fetchBoardDetails,
     createNewBoard,
     modifyBoard,
     removeBoard,
};
