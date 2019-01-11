/** Informational routes go here */

const NameList = require('../models/nameList');

module.exports = (app) => {
    // About Page
    app.get('/about', (req, res) => {
        const currentUser = req.user;
        res.render('about', { currentUser });
    });

    // Name Gallery
    app.get('/names', (req, res) => {
        const currentUser = req.user;
        NameList.find({}, (err, nameObj) => {
            res.render('names', {
                nameObj,
                currentUser,
            });
        })
            .catch((err) => {
                console.log(err.message);
            });
    });
};
