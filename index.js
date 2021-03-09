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

// models
const Student = require("./models/Student");
const Staff = require("./models/Staff");
const Course = require("./models/Course");
const Career = require("./models/Career");
const AdvisingWindow = require("./models/AdvisingWindow");

// routes
app.get("/", (req, res) => {
    res.status(200).send("Server running...");
});

app.use("/admin", require("./routes/admin"));

app.use("/student", require("./routes/student"));

app.use("/courses", require("./routes/courses"));

app.use("/careers", require("./routes/careers"));

app.use("/accounts", require("./routes/authorization"));

app.listen(port, () => {
    console.log(`Server is starting on port ${port}`);
});
