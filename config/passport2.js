const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/math/user')
const Coder = require('../models/programming/programmer')
const config = require('../config/database')

module.exports= function(passport){
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;


    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //console.log(jwt_payload)
        Coder.getCoderById( jwt_payload._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                console.log(user)
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}


    