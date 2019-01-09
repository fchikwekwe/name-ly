/** Put routes for quiz and selection here */
const axios = require('axios');

const Quiz = require('../models/quiz');

module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        res.render('quiz');
    });

    // QUIZ POST
    app.post('/quizzes', (req, res) => {
        Quiz.create(req.body)
            .then((quiz) => {
                console.log(quiz);
                // eventually move this to a client side JS event listener behind a button
                axios.post('https://name-ly-api.herokuapp.com/', {
                    // convert terms to lower case to resolve edge cases
                    gender: quiz.gender.toLowerCase(),
                    cultural: quiz.cultural.toLowerCase(),
                    literary: quiz.literary.toLowerCase(),
                })
                    .then((response) => {
                        console.log(response.data);
                        res.render('answers', { response });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            });
    });
};
