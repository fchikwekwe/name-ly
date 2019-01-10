/** Put routes inside user profile here */
const User = require('../models/user');

module.exports = (app) => {
    // USER SHOW
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            res.send(user);
        });
    });
};
