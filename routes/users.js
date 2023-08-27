const express = require('express');
const passport = require('passport');
const controller = require('../controllers/users_controller');

const router = express.Router();

router.get('/profile', controller.profile);

router.get('/post', controller.posts);

router.post('/createUser', controller.createUser);

router.get('/signup', (req, res) => {
    return res.render('user_sign_up', { title: "Sign up" });
});

router.get('/userAuth', passport.checkNotAuthenticated,  (req, res) => {
    return res.render('user_auth', { title: "sign in" });
});

router.post('/createSession', passport.authenticate('local', {failureRedirect : '/users/signin'}) ,controller.createSession);
module.exports = router;

router.get('/logout', (req, res) => {
    req.logOut((err) => {
        if(err) {
            return res.redirect('back');
        }
        return res.redirect('/');
    })
});