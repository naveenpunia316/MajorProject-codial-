// this file is entry point to all the routes

const express = require('express');
const homeController = require('../controllers/home_controller');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.checkAuthentication, homeController.home);


router.use('/users', require('./users'));
module.exports = router;