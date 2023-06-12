// constants for express routes, paths and db connection
const dotenv = require('dotenv').config();


const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const passport = require("passport");
const multer  = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const { parse } = require('./utilities/parser');

const port = process.env.PORT || 5000;

// app connection and resources
app.use(cors());
app.use(express.json());

// models
const AdvisingSesssion = require("./models/AdvisingSession")
const AdvisingWindow = require("./models/AdvisingWindow");
const Career = require("./models/Career");
const CareerCourse = require("./models/CareerCourse");
const Course = require("./models/Course");
const PotentialGraduate = require("./models/PotentialGraduate");
const Programme = require("./models/Programme");
const ProgrammeCourse = require("./models/ProgrammeCourse");
const Staff = require("./models/Staff");
const Student = require("./models/Student");
const StudentCourses = require("./models/StudentCourses");
const Transcript = require("./models/Transcript");

const { ppid } = require("process");

async function initializeDatabase() {
  try {
    await AdvisingSesssion.sync();
    await AdvisingWindow.sync();
    await Career.sync();
    await CareerCourse.sync();
    await Course.sync();
    await PotentialGraduate.sync();
    await Programme.sync();
    await ProgrammeCourse.sync();
    await Staff.sync();
    await Student.sync();
    await StudentCourses.sync();
    await Transcript.sync();
    
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

initializeDatabase();

// if in production (deployment), changes main client path to build
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "myadvisor/build")));
  }

// routes
app.get("/", (req, res) => {
    res.status(200).send("Server running...");
});

app.use("/admin", require("./routes/admin"));

app.use("/student", require("./routes/student"));

app.use("/courses", require("./routes/courses"));

app.use("/careers", require("./routes/careers"));

app.use("/programmes", require("./routes/programmes"));

app.use("/transcript", require("./routes/transcript"));

app.use("/accounts", require("./routes/authorization"));

// if a bad route is entered
if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      console.log(" load home ");
      //res.sendFile(path.join(__dirname, "myadvisor/build/index.html"));
    });
  } else {
    app.get("*", (req, res) => {
      console.log(" load home 2 ");
      //res.sendFile(path.join(__dirname, "myadvisor/public/index.html"));
    });
  }

app.listen(port, () => {
    console.log(`Server is starting on port ${port}`);
});
