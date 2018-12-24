/** Put routes for quiz and selection here */

module.exports = (app) => {
    // ROOT
    app.get('/', (req, res) => {
        res.render('quiz');
    })
}
