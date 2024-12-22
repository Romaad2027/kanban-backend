const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
     login: {
          type: String,
          required: true,
     },
     first_name: {
          type: String,
          required: true,
     },
     last_name: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
     },
     password: {
          type: String,
          required: true
     }
}, { versionKey: false, timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = { User };
