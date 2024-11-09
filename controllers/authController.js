const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, name } = req.body;
            await User.create({ email, password, name });
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);

            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            res.json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static renderLogin(req, res) {
        res.render('login');
    }

    static renderRegister(req, res) {
        res.render('register');
    }
}

module.exports = AuthController;