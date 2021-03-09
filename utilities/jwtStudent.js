// imports json web token module to generate token
const jwt = require("jsonwebtoken");

/**
 * Generates a jwt using valid student ID and a secret key
 * @param {number} id 
 * @returns token
 */
function jwtGeneratorStudent(id) {
    const payload = {
        user: id
    };
    return jwt.sign(payload, 
        process.env.studentSecret,
        { expiresIn: "24hr" })
}

module.exports = jwtGeneratorStudent;
