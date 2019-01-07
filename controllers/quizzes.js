/** Put routes for quiz and selection here */
const axios = require('axios');

module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        res.render('quiz');
    });

    // Quiz Post
    app.post('/quizzes', () => {
        // eventually move this to an event listener
        axios.post('https://name-ly-api.herokuapp.com/api', {
            questionOne: 'feminine',
            questionTwo: 'celtic',
            questionThree: 'fantasy',
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    });
};
