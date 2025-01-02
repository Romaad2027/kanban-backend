const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
require("dotenv").config();

const verifyAuthToken = (req, res, next) => {
     const token = req.headers.authorization;

     if (!token) {
          return res.status(401).json({ message: "Authorization token is required" });
     }

     jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
          if (err) {
               return res.status(401).json({ message: "JWT verification failed", error: err });
          }
          try {
               const user = await User.findById(decodedToken.userId);

               if (user) {
                    req.headers.userId = decodedToken.userId;
                    next();
               } else {
                    return res.status(401).json({ message: "User not found" });
               }
          } catch (error) {
               console.error("Error:", error);
               return res.status(500).json({ message: error.message, error });
          }
     });
};

module.exports = verifyAuthToken;
