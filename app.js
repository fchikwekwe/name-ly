/*
*  Name-ly main server
*/

/** Require environment variable(s) */
require('dotenv').config();

/** Require middlewares */
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

/** Custom auth checking middleware */
const checkAuth = (req, res, next) => {
    // console.log('Checking authentication');
    if (typeof req.cookies.nToken === 'undefined' || req.cookies === null) {
        req.profile = null;
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.profile = decodedToken.payload;
    }
    next();
};

/** Instantiate server */
const app = express();
const PORT = process.env.PORT || 3000;

/** Database connection */
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/name-ly', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected successfully.');
});

/** Use middlewares */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkAuth);

/** Require controllers */
// require('./controllers/auth.js')(app);
// require('./controllers/about.js')(app);
require('./controllers/quizzes.js')(app);
// require('./controllers/users.js')(app);

/** Port listener */
app.listen(PORT, () => {
    console.log('Name Generator listening on port', PORT);
});

module.exports = app;
