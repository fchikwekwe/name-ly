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

    // Search
    app.get('/search', (req, res) => {
        NameList
            .find(
                { $text: { $search: req.query.term } },
                { score: { $meta: 'textScore' } }
            )
            .sort({ score : { $meta: 'textScore' } })
            .limit(20)
            .exec((err, nameObj) => {
                if (err) { return res.status(400).send(err) }

                return res.render('names-index', {
                    nameObj,
                    term: req.query.term
                });
            });
    });
};
