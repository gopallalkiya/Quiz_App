var mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quiz_id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions: { 
        type: Array,
        default:[]
    },
    passing_percentage: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Quiz", quizSchema);