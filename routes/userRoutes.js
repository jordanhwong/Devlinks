const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const { registerValidator, loginValidator } = require('../validators/userValidator');
const validate = require('../middleware/validate');

router.post('/register', validate(registerValidator), userController.register);

router.post('/login', validate(loginValidator), userController.login);

module.exports = router;