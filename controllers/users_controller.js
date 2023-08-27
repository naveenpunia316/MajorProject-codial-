const mongoose = require('mongoose');
const user = require('../models/user');
const { response } = require('express');

module.exports.profile = (req, res) => {
    return res.render("profile", { result: result, title: `${result.name}` });
}

module.exports.posts = (req, res) => {
    return res.end('<h1>users post</h1>')
}

module.exports.createSession = (req, res) => {
    console.log("serialised call : " + req.session.passport.user); // user id
    return res.redirect('/');
}


module.exports.createUser = (req, res) => {
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
                        res.redirect('/users/userAuth');
                        return;
                    })
                    .catch((userCreateErr) => {
                        console.log('error in creation of new contact', userCreateErr);
                    })
                return;
            }
            res.redirect('/users/userAuth');
            return;
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/users/userAuth');
            return;
        });
}

module.exports.destroySession  = (req, res) => {
    req.logout((err) => {
        if(err) console.log(err);
        return res.redirect('/');
    });
}