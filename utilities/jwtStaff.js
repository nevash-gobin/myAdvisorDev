// imports json web token module to generate token
const jwt = require("jsonwebtoken");

/**
 * Generates a jwt using valid staff ID and a secret key
 * @param {number} id 
 * @returns token
 */
function jwtGeneratorStaff(id) {
    const payload = {
        user: id
    };
    return jwt.sign(payload, 
        process.env.staffSecret,
        { expiresIn: "24hr" })
}

module.exports = jwtGeneratorStaff;
