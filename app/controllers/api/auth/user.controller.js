const { userModel, userValidator } = require('../../../models/auth/user.model');
const tokenModel = require('../../../models/auth/token.model');
const { hashPassword, verifyPasswords, tokenGenerator, transporter, sendEmailVerificationLink } = require('../../../helper/auth.helper');
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

class UserController {

    async registerUser(req, res) {
        try {
            if (!(req.body.password === req.body.confirmPassword)) {
                return res.status(403).json({ message: 'Passwords do not match.', });
            }

            let user = await userModel.findOne({ email: req.body.email.toLowerCase() });
            if (user) {
                return res.status(403).json({ message: 'Email already exists!', })
            }

            const body = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                name: req.body.first_name + " " + req.body.last_name,
                email: req.body.email.toLowerCase(),
                hint: {
                    question: req.body.hint.question,
                    answer: req.body.hint.answer,
                }
            }

            const hashedPassword = await hashPassword(req.body.password);
            body.password = hashedPassword;

            const file = req.file;
            const basePath = `${req.protocol}://${req.get('host')}/uploads`;
            let imagePath = `${basePath}/assets/no-image.png`;
            if (file) {
                imagePath = `${basePath}/${file.filename}`;
            }
            body.image = imagePath;

            const { errors, value } = userValidator.validate(body);

            if (errors) {
                console.log("Validation failed: ", errors);
                return res.status(403).json({ message: 'Invalid input!', })
            }

            /** First save the user details */
            user = await new userModel(value).save();

            /** Now generate and save the token for mail verification */
            const token = await new tokenModel({
                user: user._id,
                token: crypto.randomBytes(16).toString('hex'),
            }).save();

            let verification_mail_id = `http://${req.headers.host}/confirmation/${user.email}/${token.token}`;

            /** Now send the verification mail*/
            let mailOptions = {
                from: 'no-reply@sayantan.com',
                to: user.email,
                subject: 'Account Verification',
                html: `
                    <h1>Hello, ${user.name}</h1>
                    <p>Please verify your account by clicking the link below:</p>
                    <a href="${verification_mail_id}" style="color: blue;">${verification_mail_id}</a>
                    <p>Thank you!</p>
                `
            };
            await sendEmailVerificationLink(req, res, mailOptions);

            return res.status(200).json({
                message: `Registration successful! ${body.name}, please check your email for verification.`,
                data: user
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: error.message,
                error
            })
        }
    }

    async confirmEmail(req, res) {
        try {
            const _token = req.params.token;
            const _mail = req.params.email;

            const token = await tokenModel.findOne({ token: _token });
            if (!token) {
                return res.status(403).json({ message: 'Invalid or expired token!' })
            }

            const user = await userModel.findById(token.user);
            console.log("user: ", user);
            if (!user) {
                return res.status(403).json({ message: 'User not found!' })
            }

            if (user.isVerified) {
                req.flash('message', ['', 'warning']);
                return res.status(403).json({ message: 'Email already verified!' })
            }

            const verifiedUser = await userModel.findOneAndUpdate(
                { email: _mail },
                { $set: { isVerified: true, isActive: true } },
                { new: true }
            );

            return res.status(200).json({ message: `Successfully verified! ${verifiedUser?.name}, You can log in now.` })
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: error.message,
                error
            })
        }
    }


    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email: email, isActive: true });

            if (!user) {
                return res.status(403).json({ message: 'User not found!' })
            }

            if (!user.isVerified) {
                return res.status(403).json({ message: 'Email not verified yet!' })
            }

            if (verifyPasswords(password, user.password)) {
                const token = await tokenGenerator({
                    name: user.name,
                    email: user.email,
                    user_id: user._id,
                    role: user.role
                });
                // res.cookie('x-access-token', token, { expires: new Date(Date.now() + 60 * 60 * 1000) });
                res.cookie('x-access-token', token, {
                    httpOnly: true,  // prevents JavaScript from accessing the cookie
                    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
                });
                return res.status(200).json({
                    message: `Logged in successfully!`,
                    data: user
                })
            }


        } catch (error) {
            console.log("error: ", error);
            return res.status(500).json({
                message: error.message,
                error
            })
        }
    }
}

module.exports = new UserController();