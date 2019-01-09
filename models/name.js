const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NameSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('name', NameSchema);
