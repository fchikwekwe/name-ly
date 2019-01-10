const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NameSchema = new Schema({
    names: {
        type: Array,
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
