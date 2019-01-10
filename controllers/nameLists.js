const NameList = require('../models/nameList');

module.exports = (app) => {
    app.post('/answers', (req, res) => {
        NameList.create(req.body)
            .then((names) => {
                res.cookie('chosenNames', names, {
                    maxAge: 900000,
                    httpOnly: true,
                });
                res.clearCookie('nameOptions');
                res.redirect('/sign-up');
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
};
