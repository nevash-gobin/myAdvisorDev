import express from "express";

// constants for express routes, paths and db connection
const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const PORT = 5000;

// app connection and resources
app.use(cors());
app.use(express.json());

/* Routes */
app.get("/", (req, res) => {
    res.send("Server running...");
});

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});
