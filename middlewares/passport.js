// const { required } = require('@hapi/joi');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../config/index')

const Users = require('../Model/User')

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
        const user = await Users.findById(payload.sub);
        if (!user) done(null, false);
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    try {
        const user = await Users.findOne({ email });
        if (!user) done(null, false);
        const isValidPass = await user.isValidPassword(password);
        console.log(isValidPass);
        if (!isValidPass) done(null, false);
        done(null, user)
            // const user = await Users.findOne({ email });
            // if (!user) done(null, false)
            // const isValidPass = await user.isValidPassword(password);
            // if (!isValidPass) done(null, false);
            // done(null, user);
    } catch (error) {
        done(null, error)
    }
}))