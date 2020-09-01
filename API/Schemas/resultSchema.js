var mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    email_id: {
        type: String,
        required: true
    },
    quiz_id: {
        type: String,
        required: true
    },
    total_questions: { 
        type: Number,
        required: true
    },
    total_correct: {
        type: Number,
        required: true
    },
    result:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Result", resultSchema);