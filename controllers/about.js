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
        const page = req.query.page || 1;

        NameList
            .paginate(
                { $text: { $search: req.query.term } },
                { score: { $meta: 'textScore' } },
                { page, limit: 20, sort: { score: { $meta: 'textScore' } } }
            )
            .then((results) => {
                return res.render('names-index', {
                    names: results.docs,
                    term: req.query.term,
                    pagesCount: results.pages,
                    currentPage: page,
                });
            })
            .catch((err) => {
                return res.status(400).send(err)
            });
    });
};
