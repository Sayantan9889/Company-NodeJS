const bcrypt = require("bcryptjs");
const jsonwebtoken = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const hashPassword = async (password) => {
    try {
        const salt = bcrypt.getSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong while hashing your password!");
    }
}

const comparePasswords = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong while verifing your password!");
    }
}

const tokenGenerator = async (userData) => {
    try {
        const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
        return token;
    } catch (error) {
        console.log("error: ", error);
    }
}

const transporter = async () => {
    try {
        const transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        return transporter;
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong while setting up email transporter!");

    }
}

const sendEmailVerificationLink = async (req, res, transporter, mailOptions) => {
    try {
        transporter.sendMail(mailOptions);
        req.flash("message", "A Verification Email Sent To Your Mail ID.... Please Verify By Click The Link.... It Will Expire By 24 Hrs...")
        res.redirect("/login");
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Something went wrong while sending email verification link!");
    }
}

module.exports = {
    hashPassword,
    comparePasswords,
    tokenGenerator,
    transporter,
    sendEmailVerificationLink,
}