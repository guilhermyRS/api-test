// src/routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

// Rotas de renderização
router.get('/', (req, res) => res.redirect('/auth/login'));
router.get('/login', AuthController.renderLogin);
router.get('/register', AuthController.renderRegister);

// Rotas da API
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Rota para verificar se o usuário está autenticado
router.get('/check', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;