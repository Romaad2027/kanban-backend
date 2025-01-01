const express = require("express");
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const cors = require("cors");
require("dotenv").config();

const connectDatabase = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const authenticate = require("./middlewares/auth.middleware");
const boardRoutes = require("./routes/board.routes");
const taskRoutes = require("./routes/task.routes");
const subTaskRoutes = require("./routes/subTask.routes");

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Welcome Route
app.get("/", (req, res) => {
     res.send("Welcome to the Kanban Board API Home Page!");
});

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Authentication Routes
app.use("/", authRoutes);

// Protected Routes (Require Authentication)
app.use(authenticate);
app.use("/board", boardRoutes);
app.use("/task", taskRoutes);
app.use("/subtask", subTaskRoutes);

// Handle Invalid Routes
app.use("*", (req, res) => {
     res.status(404).json({ message: "Invalid URL Endpoint!" });
});

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
     try {
          console.log(`Server running at: http://localhost:${PORT}`);
          console.log("Connecting to the database...");
          await connectDatabase;
          console.log("Database connected successfully");
     } catch (error) {
          console.error("Database connection error:", error.message);
     }
});
