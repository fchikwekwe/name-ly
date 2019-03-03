const jwt = require('jsonwebtoken');
const User = require('../models/user');

// UPLOADING TO AWS S3
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const Upload = require('s3-uploader');


const client = new Upload(process.env.s3_BUCKET, {
    aws: {
        path: 'users/avatar',
        region: process.env.S3_REGION,
        acl: 'public-read',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    cleanup: {
        versions: true,
        original: true,
    },
    versions: [{
        maxWidth: 400,
        aspect: '16:10',
        suffix: '-standard',
    }],
});

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

    // USER EDIT FORM
    app.get('/users/:id/edit', (req, res) => {
        const currentUser = req.user;
        const decoded = jwt.verify(req.cookies.nameToken, process.env.SECRET);
        User.findById(decoded._id, (err, user) => {
            res.render('user-edit', {
                user,
                currentUser,
            });
        });
    });

    // UPDATE ENTIRE PROFILE
    app.put('/users/:id/profileUpdate', upload.single('avatar'), (req, res, next) => {
        console.log('file', req.file);
        // const currentUser = req.user;
        const decoded = jwt.verify(req.cookies.nameToken, process.env.SECRET);

        User.findById(decoded._id, (err, user) => {
            if (req.file) {
                client.upload(req.file.path, {}, (err, versions, meta) => {
                    if (err) { return res.status(400).send({ err }); }

                    versions.forEach((image) => {
                        const urlArray = image.url.split('-');
                        urlArray.pop();
                        const url = urlArray.join('-');

                        user.avatar = url;
                        user.update();
                    })
                    res.redirect(`/users/${user._id}`);
                });
            }
        });
    });
};
