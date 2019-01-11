/** Quiz and name selection routes here */
const axios = require('axios');

const Quiz = require('../models/quiz');

module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        const currentUser = req.user;
        res.render('quiz', { currentUser });
    });

    app.get('/quizzes', (req, res) => {
        const currentUser = req.user;
        const names = req.cookies.nameOptions;
        res.render('answers', {
            names,
            currentUser,
        });
    });

    // QUIZ POST
    app.post('/quizzes', (req, res) => {
        res.clearCookie('nameOptions');
        res.clearCookie('chosenNames');
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
