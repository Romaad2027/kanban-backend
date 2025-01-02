const express = require('express');
const { createNewTrack } = require('../controllers/track.controller');
const trackRouter = express.Router();

// ! Pass the board's id in param's of the URL to add task in it
trackRouter.post("/:id", createNewTrack)

// // ! Update specific Task by passing the id of the task in the URL param and the changes in the req-body
// trackRouter.patch('/:id', modifyTask)

// // ! Delete specific Task by passing the id of the task in the URL param and 'boardId' key in req-body
// trackRouter.delete('/:id', removeTask)

module.exports = trackRouter;