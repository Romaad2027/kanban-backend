const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = mongoose.connect(process.env.BACKEND_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connectDB;
