const express = require('express');
const { loginUser, registerUser } = require('../controllers/user.controller');

const authRouter = express.Router();

authRouter.post("/signin", loginUser)
authRouter.post("/signup", registerUser)

module.exports = authRouter;