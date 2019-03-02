/** Authorization routes here */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const path = require('path');

/** Require Nodemailer and Mailgun */
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.EMAIL_DOMAIN,
    }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));


module.exports = (app) => {
    // SIGN-UP GET
    app.get('/sign-up', (req, res) => {
        const currentUser = req.user;
        const nameList = req.cookies.chosenNames;
        res.render('sign-up', {
            nameList,
            currentUser,
        });
    });

    // SIGN-UP POST
    app.post('/sign-up', async (req, res) => {
        let user;
        try {
            user = await new User(req.body);
            await user.save();
        } catch (err) {
            console.log(err);
        }
        let token;
        try {
            token = await jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
            res.cookie('nameToken', token, {
                maxAge: 900000,
                httpOnly: true,
            });
            res.redirect(`/users/${user._id}`);
        } catch (err) {
            console.log(err);
        }
    });

    // LOGIN
    app.get('/login', (req, res) => {
        const currentUser = req.user;
        res.render('login', { currentUser });
    });

    // LOGIN POST
    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // Find this username
        User.findOne({ username }, 'username password')
            .then((user) => {
                if (!user) {
                    // User not found
                    return res.status(401).send({
                        message: 'Wrong username or password!',
                    });
                }
                // Check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // Password does not match
                        return res.status(401).send({
                            message: 'Password is not valid!',
                        });
                    }
                    // User authenticated; Creating JWT
                    const token = jwt.sign({
                        _id: user._id,
                        username: user.username,
                    }, process.env.SECRET, {
                        expiresIn: '60 days',
                    });
                    // Set a cookie and redirect to user profile
                    res.cookie('nameToken', token, {
                        maxAge: 900000,
                        httpOnly: true,
                    });
                    if (req.cookies.chosenNames) {
                        console.log(req.cookies.chosenNames);
                        res.redirect(`/users/${user._id}/update`);
                    }
                    else {
                        res.redirect(`/users/${user._id}`);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('nameToken');
        res.redirect('/');
    });
};
