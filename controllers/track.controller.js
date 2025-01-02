const Track = require('../models/track.model');
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

const createNewTrack = async (req, res) => {
    const { id: taskId } = req.params;
    const trackData = req.body;

    await executeAsyncRequest(req, res, async () => {
        console.log(taskId)
        const task = await Task.findById(taskId);

        const newTrack = new Track({ ...trackData })

        task.track_ids.push(newTrack._id)

        await newTrack.save();
        await task.save();

        res.status(201).json({ message: `Track Created Successfully in ${task.title}` });
    });
};

const modifyTrack = async (req, res) => {
    const { id: trackId } = req.params;
    const trackUpdates = req.body;

    await executeAsyncRequest(req, res, async () => {
        await Track.findByIdAndUpdate(trackId, trackUpdates);
        res.status(200).json({ message: 'Track Updated Successfully' });
    });
};

const removeTask = async (req, res) => {
    const { id: trackId } = req.params;
    const { taskId } = req.body;

    await executeAsyncRequest(req, res, async () => {
        const track = await Track.findById(trackId);
        const task = await Task.findById(taskId);

        // Remove the task reference from the board
        task.track_ids = task.track_ids.filter((trackIdInTask) => trackIdInTask.toString() !== trackId);
        await task.save();

        await Track.findByIdAndDelete(trackId);

        res.status(200).json({ message: 'Task Deleted Successfully' });
    });
};

module.exports = {
    createNewTrack,
    modifyTrack,
    removeTask,
};
