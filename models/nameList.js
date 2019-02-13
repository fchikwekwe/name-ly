/** Name list objects */
const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = {
    limit: 3,
};

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

NameSchema.plugin(mongoosePaginate);
NameSchema.index({ names: 'text' });

module.exports = mongoose.model('Name', NameSchema);
