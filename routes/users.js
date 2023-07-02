const express = require('express');

const controller = require('../controllers/users_controller');

const router = express.Router();

router.get('/profile', controller.profile);
router.get('/post', controller.posts);
router.post('/signup', controller.signup);
router.get('/signup', (req, res) => {
    return res.render('user_sign_up', { title: "Sign up" });
});

router.get('/signin', (req, res) => {
    return res.render('user_sign_in', { title: "sign in" });
});

router.get('/signout', (req, res) => {
    res.cookie('user_id', null)
    res.redirect('/users/signin');
});

router.post('/signin', controller.signin);
module.exports = router;
