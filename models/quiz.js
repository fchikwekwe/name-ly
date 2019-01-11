/** Quiz and Selection model */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    gender: {
        type: String,
        required: true,
    },
    cultural: {
        type: String,
        required: true,
    },
    literary: {
        type: String,
        required: true,
    },
    names: {
        type: Array,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('quiz', QuizSchema);
