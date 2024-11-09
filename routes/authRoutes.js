const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.get('/login', AuthController.renderLogin);
router.get('/register', AuthController.renderRegister);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;