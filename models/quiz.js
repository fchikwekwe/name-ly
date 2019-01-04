const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    answers: Array,
});

module.exports = mongoose.model('quiz', QuizSchema);
