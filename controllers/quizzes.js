/** Put routes for quiz and selection here */
const axios = require('axios');

const Quiz = require('../models/quiz');

module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        res.clearCookie('nameOptions');
        res.clearCookie('chosenNames');
        res.render('quiz');
    });

    app.get('/quizzes', (req, res) => {
        console.log(req.cookies);
        const names = req.cookies.nameOptions;
        res.render('answers', { names });
    });

    // QUIZ POST
    app.post('/quizzes', (req, res) => {
        Quiz.create(req.body)
            .then((quiz) => {
                // eventually move this to a client side JS event listener behind a button
                axios.post('https://name-ly-api.herokuapp.com/', {
                    // convert terms to lower case to resolve edge cases
                    nameNumber: 10,
                    gender: quiz.gender.toLowerCase(),
                    cultural: quiz.cultural.toLowerCase(),
                    literary: quiz.literary.toLowerCase(),
                })
                    .then((response) => {
                        const names = response.data.name;
                        res.cookie('nameOptions', names, {
                            maxAge: 900000,
                            httpOnly: true,
                        });
                        res.redirect('/quizzes');
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }).catch((err) => {
                console.log(err.message);
            });
    });
};

// create quiz
// send axios request to api
// display the results to the user
// save the user's chosen names to a cookie
// send them to the login route
