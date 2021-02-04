const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Staff = require("../models/Staff");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Staff.findOne({ where: {id: jwt_payload.id} })
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log("Error: ", err.message));
        })
    );
};

// const jwt = require("jsonwebtoken");

// require("dotenv").config();

// /**
//  * Generates a JWT for a user upon lgoin and expires it after 24 hours
//  * @param {int} id A user assigned id from the database
//  */
// function jwtGenerator(id) {
//     const payload = {
//         user: id,
//     };
//     return jwt.sign(payload, process.env.secret, { expiresIn: "24hr" });
// }

// module.exports = jwtGenerator;
