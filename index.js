// constants for express routes, paths and db connection
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const passport = require("passport");
const port = process.env.PORT || 5000;

// JWT Configurations
require("./utilities/jwtStaff")(passport);
require("./utilities/jwtStudent")(passport);

// app connection and resources
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// models
const Student = require("./models/Student");
const Staff = require("./models/Staff");
const Course = require("./models/Course");

// routes
app.get("/", (req, res) => {
    res.status(200).send("Server running...");
});

app.use("/admin/accounts", require("./routes/accounts"));

app.use("/student", require("./routes/student_auth"));

app.listen(port, () => {
    console.log(`Server is starting on port ${port}`);
});
