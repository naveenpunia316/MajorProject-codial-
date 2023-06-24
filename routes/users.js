const express = require('express');

const controller = require('../controllers/users_controller');

const router = express.Router();

router.get('/profile', controller.profile);
router.get('/post', controller.posts);
module.exports = router;
