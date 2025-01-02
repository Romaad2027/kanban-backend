const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
    description: {
        type: String,
        default: "",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    logged_time: {
        type: Number,
        requried: true
    }
}, { timestamps: true })

const TrackModel = mongoose.model('track', trackSchema);

module.exports = TrackModel;