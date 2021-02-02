// constants to enable connectivity between components and encryption using bcrypt
// bcrypt and saltRounds enable authorization and encryption
const router = require("express").Router();
const db = require("../db");
const Student = require("../models/User");
const bcrypt = require("bcrypt");

/* ADMIN */
// add new student account
router.post("/accounts/students/create", async (req, res) => {
    try {
        // destructure data entered
        const {username, password} = req.body

        // check if user exists since duplicate usernames aren't allowed
        const user = await Student.findOne({where: { username }});
        if(user) {
            return res.status(401).send("Student already exists.");
        }
        else {
            // saltRounds are needed to increase the degree of hashing
            // passEncrypt is the encrypted version of the password entered which uses the salt created
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passEncrypt = await bcrypt.hash(password, salt);

            await Student.create({
                username,
                password: passEncrypt,
            })
            .then(() => {
                return res.status(200).send("Student added!");
            })
            .catch(err => {
                    console.log("Error: ", err.message);
            });
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
