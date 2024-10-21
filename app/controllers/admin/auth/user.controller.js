const { userModel, userValidator } = require('../../../models/auth/user.model');
const tokenModel = require('../../../models/auth/token.model');
const fs = require('fs');
const path = require('path');

class UserController {
    async registration(req, res) {
        try {
            res.render('auth/registration', {
                title: 'Registration',
                data: {
                    url: req.url
                },
                messages: req.flash('message')
            });
        } catch (error) {
            console.log("error: ", error);
            res.redirect('/login');
        }
    }
    async login(req, res) {
        try {
            res.render('auth/login', {
                title: 'Login',
                data: {
                    url: req.url
                },
                messages: req.flash('message')
            });
        } catch (error) {
            console.log("error: ", error);
            res.redirect('/login');
        }
    }






    async registerUser(req, res) {
        try {
            const { errors, isValid } = userValidator(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, password } = req.body;
            let user = await userModel.findOne({ email });
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            }
            user = new userModel({ email, password });
            await user.save();
            res.json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = new UserController();