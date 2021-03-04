/**
 * initalizes express router and database connection
 */
const router = require("express").Router();
const db = require("../db");

// import models
const Career = require("../models/Career");

// get all careers in the database
router.get("/all", async (req, res) => {
    try {
        // finds all the courses and responds with a json list 
        const careers = await Career.findAll();
        res.status(200).json(careers);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// add a course to the database
router.post("/add", async (req, res) => {
    try {
        // destructure data entered
        const {name, description} = req.body;

        // check if courses is already added
        const career = await Career.findOne({where : { name }});
        if(career) {
            return res.status(401).send("Career already in database");
        }
        else {
            await Career.create({
                name,
                description,
            })
            .then(() => {
                return res.status(200).send("Career added!");
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

// update a selected career
router.put("/edit/:id", async (req, res) => {
    try {
        const {name, description} = req.body;

        const career = await Career.findOne({where: { id: req.params.id }});
        if(!career) {
            return res.status(401).send("Career not found.");
        }
        else {
            // updates course with new information
            if (name) {
                career.name = name;
            }
            if (description) {
                career.description = description;
            }

            await career.save();
            res.status(200).send("Career Updated");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// delete a career from the database
router.delete("/delete/:id", async (req, res) => {
    try {
        const career = await Career.findOne({where: { id: req.params.id }});
        if(!career) {
            return res.status(401).send("Career not found.");
        }
        else {

            await career.destroy();
            res.status(200).send("Career Removed");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
