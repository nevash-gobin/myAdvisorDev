const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const token = req.header("token");

        if (!token) {
            return res.status(403).send("Not Authorized");
        }
        const payload = jwt.verify(token, process.env.secret);
        req.user = payload.user;

        next();
    }
    catch (err) {
        console.log("Error: ", err.message);
        return res.status(403).send("Not Authorized");
    }
};
