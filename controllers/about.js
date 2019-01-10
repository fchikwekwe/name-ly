/** Informational routes go here */

const NameList = ('../models/nameList');

module.exports = (app) => {
    // About Page
    app.get('/about', (req, res) => {
        const currentUser = req.user;
        res.render('about', { currentUser });
    });

    // Name Gallery
    app.get('/names', (req, res) => {
        const currentUser = req.user;
        NameList.find({}, (err, names) => {
            res.render('names', {
                names,
                currentUser,
            });
        })
            .catch((err) => {
                console.log(err.message);
            });
    });
};
