/** Put routes for quiz and selection here */
const axios = require('axios');

module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        res.render('quiz');
    });

    // Quiz Post
    app.post('/quizzes', () => {
        // eventually move this to a client side JS event listener behind a button
        axios.post('https://name-ly-api.herokuapp.com/', {
            gender: 'feminine',
            cultural: 'celtic',
            literary: 'fantasy',
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    });
};
