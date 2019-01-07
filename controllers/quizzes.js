/** Put routes for quiz and selection here */
const request = require('request');

module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        res.render('quiz');
    });

    // Quiz Post
    app.post('/quizzes', (req, res, next) => {
        const params = req.params;
        request.get({
            uri: 'http://namedlyapi.herokuapp.com/api',
            qs: params, // Send required data
        }, (err, res, body) => {
            console.log(body);
        });
    });
};
