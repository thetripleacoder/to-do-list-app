// express framework
const express = require('express');

// Router / "mini app"
const router = express.Router();

// controllers
const userController = require('../controllers/userController');

// user methods(endpoint, controller modules)
router.post('/register', userController.register);

module.exports = router;
