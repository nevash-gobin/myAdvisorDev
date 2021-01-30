// constants for express routes, paths and db connection
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const port = process.env.PORT || 5000;

// app connection and resources
app.use(cors());
app.use(express.json());

/* Routes */
app.get("/", (req, res) => {
    res.status(200).send("Server running...");
});

app.listen(port, () => {
    console.log(`Server is starting on port ${port}`);
});
