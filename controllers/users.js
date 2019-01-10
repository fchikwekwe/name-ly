/** Put routes inside user profile here */
const User = require('../models/user');

module.exports = (app) => {
    // USER SHOW
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            res.clearCookie('chosenNames'); // unsure if this is a good idea
            const currentUser = req.user;
            console.log(currentUser);
            res.render('profile', {
                user,
                currentUser,
            });
        });
    });

    // UPDATE NAMES FORM
    app.get('/users/:id/update', (req, res) => {
        const currentUser = req.user;
        const names = req.cookies.chosenNames.names;
        console.log(names);
        User.findById(req.params.id, (err, user) => {
            res.render('update', {
                names,
                user,
                currentUser,
            });
        });
    });

    // UPDATE and ADD NAMES
    app.put('/users/:id/update', (req, res) => {
        const updateNames = req.body.names;
        User.findByIdAndUpdate(req.params.id,
            { $push: { nameList: updateNames } })
            .then((user) => {
                res.redirect(`/users/${user._id}`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    });

    // UPDATE LOGGED IN USER and ADD NAMES
    app.put('/users/:id/answers', (req, res) => {
        const currentUser = req.user;
        const updateNames = req.body.names;
        User.findByIdAndUpdate(currentUser._id,
            { $push: { nameList: updateNames } })
            .then((user) => {
                res.redirect(`/users/${user._id}`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
};
