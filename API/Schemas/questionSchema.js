var mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    media: {
        type: {
            type: String,
        },
        link: {
            type: String
        }
    },
    options: {
        type: Array,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Questions", questionSchema);