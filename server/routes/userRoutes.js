// express framework
const express = require('express');

// Router / "mini app"
const router = express.Router();

// controllers
const userController = require('../controllers/userController');
const auth = require('../auth');

// user methods(endpoint, controller modules)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth.verify, userController.getUserDetails);

module.exports = router;
