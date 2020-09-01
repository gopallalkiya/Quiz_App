const Quiz = require('../Schemas/quizSchema');
const Questions = require('../Schemas/questionSchema');
const Result = require('../Schemas/resultSchema');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/create', auth, async (req, res) => {
  try {
    let quiz = new Quiz({
      quiz_id: req.body.quiz_id,
      title: req.body.title,
      passing_percentage: req.body.passing_percentage,
    });
    await quiz.save();
    res.json({ "status": "Quiz Created Successfully", quiz_id: req.body.quiz_id });
  }
  catch (err) {
    res.status(500).json({ "status": "Quiz already Exists" });
  }
});

router.get('/getAllQuizzes', auth, async (req, res) => {
  let quizzes = await Quiz.find({}, { questions: 0, __v: 0 });
  res.json(quizzes);
});

router.put('/edit', auth, async (req, res) => {
  try {
    let quiz = new Quiz({
      title: req.body.title,
      passing_percentage: req.body.passing_percentage,
    });
    quiz = await Quiz.findOneAndUpdate({ quiz_id: req.body.quiz_id }, quiz, { new: true });
    res.json({ "status": "Quiz Updated Successfully", "updatedQuiz": quiz });
  }
  catch (err) {
    res.status(500).json({ "status": "Quiz Update Failed" });
  }
});

router.post('/submit', auth, async (req, res) => {
  try {
    let quiz = await Quiz.findOne({ quiz_id: req.body.quiz_id }, { questions: 1, _id: 0, passing_percentage: 1 });

    let correctQuestionAnswers = await Questions.find({ _id: { $in: quiz.questions } }, { _id: 1, answer: 1 });

    let attemptedQuestionAnswers = req.body.questions;

    let totalMarks = 0;

    for (let i = 0; i < correctQuestionAnswers.length; i++) {
      if (correctQuestionAnswers[i]._id.toString() == attemptedQuestionAnswers[i]._id.toString()) {
        if (correctQuestionAnswers[i].answer == attemptedQuestionAnswers[i].answer)
          totalMarks++;
      }
    }

    let result = null;

    if ((totalMarks / correctQuestionAnswers.length) * 100 >= quiz.passing_percentage) {
      result = "Passed";
    } else {
      result = "Failed";
    }

    let calculatedResult = new Result({
      email_id: req.user.email_id,
      quiz_id: req.body.quiz_id,
      total_questions: correctQuestionAnswers.length,
      total_correct: totalMarks,
      result: result
    });

    await calculatedResult.save();

    res.json({ status: "Quiz Submitted Succesfully" });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ "status": "Quiz Submission Failed" });
  }
});


module.exports = router; 