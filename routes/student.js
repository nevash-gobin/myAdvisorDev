/* 
    constants to enable connectivity between components and encryption using bcrypt
    bcrypt and saltRounds enable authorization and encryption
    jwt uses the passport module to create and store a user token
*/
const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// import models
const Student = require("../models/Student");

// save advising session
router.get("/academic-advising/session", passport.authenticate("jwt", { session: true }), async (req, res) => {
    try {
        console.log(req.student.username);
        // const student = await Student.findOne({where: { id: `${req.student}` }});
        
        // if(!student) {
        //     return res.status(401).send("Invalid Student!");
        // }
        // else {
        //         res.send(student.username);
        // }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
