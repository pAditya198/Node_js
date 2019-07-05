var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Dish = require('./models/dishes');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config')

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey,
        { expiresIn: 3600 });
};

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })


    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
    User.findOne({ _id: req.user._id })
        .then((user) => {
            if (user.admin) {
                next();
            }
            else {
                err = new Error('You are Not Authorized');
                err.status = 500;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.verifyAuthor = (req, res, next) => {
    Dish.findById(req.params.dishId)
        .then((dish) => {
            if (dish.comments.id(req.params.commentId).author.equals(req.user._id)) {
                next();
            }
            else {
                err = new Error('You are Not Authorized');
                err.status = 500;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
}