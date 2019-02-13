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

/** Instantiate server */
const app = express();
const PORT = process.env.PORT || 3000;

/** Use middlewares */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cookieParser());

/** Custom auth-checking middleware */
const checkAuth = (req, res, next) => {
    // console.log('Checking authentication');
    if (typeof req.cookies.nameToken === 'undefined' || req.cookies === null) {
        req.user = null;
    } else {
        const token = req.cookies.nameToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};


app.use(checkAuth);

/** Send Email */

/** Database connection */
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/name-ly', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected successfully.');
});

/** Require controllers */
require('./controllers/auth.js')(app);
require('./controllers/about.js')(app);
require('./controllers/quizzes.js')(app);
require('./controllers/nameLists.js')(app);
require('./controllers/users.js')(app);

/** Port listener */
app.listen(PORT, () => {
    console.log('Name Generator listening on port', PORT);
});

module.exports = app;
