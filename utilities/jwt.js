const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Staff = require("../models/Staff");
const Student = require("../models/Student");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            const admin = Staff.findOne({ where: {id: jwt_payload.id} });
            const student = Student.findOne({ where: {id: jwt_payload.id }});
            if (admin) {
                return done(null, admin);
            }
            else if (student) {
                return done(null, student);
            }
            else
                return done(null, false);
        })
    );
    passport.serializeUser(function(user, done) {
        var sessionData = {};

        sessionData.user = user.id;
        
        done(null, sessionData);
    });
    passport.deserializeUser(function(sessionData, done) {
        Student.findOne({where: {id: sessionData.id}}, function (error, student) {
            if (error) {
                done(error);
            }
            else {
                done (null, student);
            }
        });
    });
};
