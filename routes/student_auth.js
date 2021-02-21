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

// login to student account
router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body

        const user = await Student.findOne({where: { username }});
        if(!user) {
            return res.status(401).send("This account does not exist.");
        }
        else {
            // compares entered password and account password for match
            const passCompare = await bcrypt.compare(password, user.password);
            
            if (!passCompare) {
                return res.status(401).send("Invalid Password");
            }
            else if (passCompare) {
                //const token = jwtGenerator(user.id);
                const payload = {
                    id: user.id,
                    username: user.username
                };
                jwt.sign(
                    payload,
                    process.env.studentSecret,
                    { expiresIn: "24hr" },
                    (err, token) => {
                        res.json({ token});
                    }
                );
            }
            else {
                res.send("Unauthorized Access");
            }
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
