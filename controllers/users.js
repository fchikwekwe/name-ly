/** User profile routes here */
const User = require('../models/user');

module.exports = (app) => {
    // USER SHOW
    app.get('/users/:id', (req, res) => {
        const currentUser = req.user;
        if (currentUser) {
            User.findById(req.params.id, (err, user) => {
                res.clearCookie('chosenNames'); // unsure if this is a good idea
                res.render('profile', {
                    user,
                    currentUser,
                });
            });
        } else {
            res.send('You need to be logged in to do that!');
        }
    });

    // UPDATE NAMES FORM
    app.get('/users/:id/update', (req, res) => {
        const currentUser = req.user;
        const names = req.cookies.chosenNames.names;
        if (currentUser) {
            User.findById(req.params.id, (err, user) => {
                res.render('update', {
                    names,
                    user,
                    currentUser,
                });
            });
        } else {
            res.send('You need to be logged in to do that!');
        }
    });

    // UPDATE and ADD NAMES
    app.put('/users/:id/update', (req, res) => {
        const currentUser = req.user;
        const updateNames = req.body.names;
        if (currentUser) {
            User.findByIdAndUpdate(req.params.id,
                { $push: { nameList: updateNames } })
                .then((user) => {
                    res.redirect(`/users/${user._id}`);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            res.send('You need to be logged in to do that!');
        }
    });

    // UPDATE LOGGED IN USER and ADD NAMES
    app.put('/users/:id/answers', (req, res) => {
        const currentUser = req.user;
        const updateNames = req.body.names;
        if (currentUser) {
            User.findByIdAndUpdate(currentUser._id,
                { $push: { nameList: updateNames } })
                .then((user) => {
                    res.redirect(`/users/${user._id}`);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            res.send('You need to be logged in to do that!');
        }
    });

    // UPDATE LOGGED IN USER and REMOVE NAMES
    app.put('/users/:id/delete', (req, res) => {
        const currentUser = req.user;
        const deleteUser = req.body.deleteNames;
        if (currentUser) {
            User.findByIdAndUpdate(currentUser._id,
                { $pull: { nameList: deleteUser } })
                .then((user) => {
                    res.redirect(`/users/${user._id}`);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            res.send('You need to be logged in to do that!');
        }
    });
};
