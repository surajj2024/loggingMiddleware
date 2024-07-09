import morgan from "morgan";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = 8080;

// Correctly derive __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a write stream (in append mode) for logging
const logFilePath = path.join(__dirname, "logger.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// Setup morgan to use the write stream
app.use(
  morgan(
    ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",
    {
      stream: logStream,
    }
  )
);

// Define a simple route
app.get("/", (req, res) => {
  res.send("I am from the home page");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
