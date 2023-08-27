const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    user.findOne({ email: email })
        .then(user => {
            if (user == null || user.password != password) {
                console.log("Envalid user name or password !");
                return done(null, false); // null tell there is on error and false says the authentication failed !
            }
            else {
                return done(null, user);
                // if done is called with null and user(result), serialization is done
                /*
                    putting user details in cookie is called so
                    and then this userid will be used to find the user in the database and this is called deserialization;
    
                */
            }
        })
        .catch(() => {
            console.log('Error in finding the user from database');
            return done(err);
        })
}));


// the passport.serializeUser func is used to specify how the user object should be serialized
// in our case we are storing userId in the session cookie
// this process is not handled by 'passport', rather it uses express-session library

passport.serializeUser((user, done) => {
    done(null, user.id);
    // it sets the serilaized data in to response as a cookie
    // this function excrypt userId using express-session.
});

/*
// now user is able to store their identity and that identity is stored in cookie session using express session.
// In the deserialization step, Passport retrieves the user object from the session based on the stored information:

// The passport.deserializeUser function is called to specify how to retrieve a user object from the serialized data.
// In this case, it retrieves the user object by finding it in the database based on the stored _id.
// deserializing the user from key in cookies
*/

passport.deserializeUser((id, done) => {
    user.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log(err);
            return done(null, err);
        });
});

passport.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    else res.redirect('/users/userAuth');
}

passport.checkNotAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;