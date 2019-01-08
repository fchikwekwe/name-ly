/** Put routes for quiz and selection here */
const axios = require('axios');

const Quiz = require('../models/quiz');

module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        res.render('quiz');
    });

    app.get('/quizzes', (req, res) => {
        Quiz.find({})
            .then((answers) => {
                res.send(answers);
            });
    });

    // Quiz Post
    app.post('/quizzes', (req, res) => {
        Quiz.create(req.body)
            .then((quiz) => {
                console.log(quiz);
                // eventually move this to a client side JS event listener behind a button
                axios.post('https://name-ly-api.herokuapp.com/', {
                    gender: quiz.gender,
                    cultural: quiz.cultural,
                    literary: quiz.literary,
                })
                    .then((name) => {
                        console.log(name);
                        res.redirect('/quizzes');
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            });
    });
};
