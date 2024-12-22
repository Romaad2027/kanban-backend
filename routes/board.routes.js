const express = require('express');
const { fetchAllBoards, fetchBoardDetails, createNewBoard, modifyBoard, removeBoard } = require('../controllers/board.controller');

const boardRouter = express.Router();

boardRouter.get("/", fetchAllBoards);
boardRouter.get("/:id", fetchBoardDetails);
boardRouter.post("/", createNewBoard);
boardRouter.patch('/:id', modifyBoard);
boardRouter.delete('/:id', removeBoard);


module.exports = boardRouter;