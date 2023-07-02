const mongoose = require('mongoose');
const user = require('../models/user');
const { response } = require('express');

module.exports.profile = (req, res) => {
    return res.render("profile", { result: result, title: `${result.name}` });
}

module.exports.posts = (req, res) => {
    return res.end('<h1>users post</h1>')
}

module.exports.signin = (req, res) => {

}


module.exports.signup = (req, res) => {
    console.log(req.body)
    if (req.body.password != req.body['confirm-password'] || req.body.name == '') {
        res.redirect('back');
        return;
    }
    user.findOne({ email: req.body.email })
        .then((result) => {
            if (result == null) {
                user.create(req.body)
                    .then((newUser) => {
                        console.log(`new user created ${newUser}`);
                        res.redirect('/users/signin');
                        return;
                    })
                    .catch((userCreateErr) => {
                        console.log('error in creation of new contact', userCreateErr);
                    })
                return;
            }
            res.redirect('/users/signup');
            return;
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/users/signup');
            return;
        });
}