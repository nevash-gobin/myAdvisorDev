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
const Staff = require("../models/Staff");

// login to student or staff account
router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body

        const admin = await Staff.findOne({where: { username }});
        const student = await Student.findOne({where: {username }});

        if(!admin && !student) {
            return res.status(401).send("This account does not exist.");
        }
        else if (admin) {
            // compares entered password and account password for match
            const passCompare = await bcrypt.compare(password, admin.password);

            if (!passCompare) {
                return res.status(401).send("Invalid Password");
            }
            else if (passCompare) {
                //const token = jwtGenerator(user.id);
                const payload = {
                    id: admin.id,
                    username: admin.username
                };
                jwt.sign(
                    payload,
                    process.env.secret,
                    { expiresIn: "24hr" },
                    (err, token) => {
                        res.json({ token });
                    }
                );
            }
        }
        else if (student) {
            const passCompare2 = await bcrypt.compare(password, student.password);
            
            if (!passCompare2) {
                return res.status(401).send("Invalid Password");
            }
            else if (passCompare2) {
                const payload = {
                    id: student.id,
                    username: student.username
                };
                jwt.sign(
                    payload,
                    process.env.secret,
                    { expiresIn: "24hr" },
                    (err, token) => {
                        res.json({ token });
                    }
                );
            }
        }
        else {
            res.send("Unauthorized Access");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
