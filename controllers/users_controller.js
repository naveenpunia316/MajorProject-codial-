const mongoose = require('mongoose');
const user = require('../models/user');
const { response } = require('express');

module.exports.profile = (req, res) => {
    if (req.cookies.user_id) {
        // there is another function findById
        user.findOne({ _id: req.cookies.user_id })
            .then((result) => {
                return res.render("profile", { result: result, title: `${result.name}` });
            })
            .catch((err) => {
                req.cookies.user_id = null;
                return res.redirect('/users/signin');
            })
    }
    else
        return res.redirect('/users/signin');
}

module.exports.posts = (req, res) => {
    return res.end('<h1>users post</h1>')
}

module.exports.signin = (req, res) => {
    user.findOne({ email: req.body.email })
        .then((result) => {
            if (result) {
                if (result.password == req.body.password) {
                    res.cookie("user_id", result._id);
                    // creating the session 
                    return res.redirect('/users/profile');
                }
                else return res.redirect('back');
            }
            else return res.redirect('back');
        })
        .catch((err) => {
            console.log('error duing signing in !');
            return res.redirect('/users/signin');
        })
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