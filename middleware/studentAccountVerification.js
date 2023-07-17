// imports json web token module to authenticate token
const jwt = require("jsonwebtoken");

//const express = require("express");
//const db = require("../db");
//const Student = db.students; 

/**
 * Requests header from request and authenticates it. If valid, returns the student payload
 * @param {Object} req contains information about the HTTP request made
 * @param {Object} res contains information about the HTTP response received
 * @param {Object} next passes control to next function
 * @returns student payload
 */
module.exports = async (req, res, next) => {
    try {
        const token = req.header("token");

        if (!token) {
            return res.status(403).json("Not Authorized!");
        }
        const payload = jwt.verify(token, process.env.studentSecret);

        //console.log(payload); 

        req.user = payload.user;
        next();
    }
    catch (err) {
        console.error("Error: ", err.message);
        return res.status(403).json("Not Authorized");
    }
}
