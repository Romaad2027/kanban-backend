const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Board = require("../models/board.model");
require("dotenv").config();

const loginUser = async (req, res) => {
     const { email, password } = req.body;

     try {
          const foundUser = await User.findOne({ email });

          if (foundUser) {
               bcrypt.compare(password, foundUser._doc.password, function (err, isPasswordValid) {
                    if (isPasswordValid) {
                         const token = jwt.sign(
                              { userId: foundUser._doc._id },
                              process.env.SECRET_KEY,
                              { expiresIn: '24h' }
                         );
                         console.log(token)

                         res.status(200).json({ message: "Login successful", user: { ...foundUser._doc, token } });
                    } else {
                         res.status(400).json({ message: "Incorrect Password!" });
                    }
               });
          } else {
               res.status(404).json({ message: "User not found!" });
          }
     } catch (error) {
          console.log(error)
          res.status(500).json({
               message: "Internal server error!",
               error: error.message,
          });
     }
};

const registerUser = async (req, res) => {
     const { username, email, password } = req.body;

     try {
          const existingUsers = await User.find({ email });

          if (existingUsers.length) {
               res.status(400).json({ message: "User already exists!" });
          } else {
               bcrypt.hash(password, +process.env.SALT_ROUND, async function (err, hashedPassword) {
                    if (err) {
                         res.status(500).json({ message: "Error in hashing password" });
                    } else {
                         try {
                              const newUser = new User({ username, email, password: hashedPassword });
                              await newUser.save();

                              // Create a default board for the new user
                              const defaultBoard = new Board({ name: 'Board 1', user: newUser._id });
                              await defaultBoard.save();

                              res.status(201).json({ message: "Registration successful" });
                         } catch (error) {
                              res.status(400).json({
                                   message: error.message,
                                   error: error,
                              });
                              console.log('error:', error);
                         }
                    }
               });
          }
     } catch (error) {
          res.status(500).json({
               message: "Internal server error!",
               error: error,
          });
     }
};

module.exports = { loginUser, registerUser };
