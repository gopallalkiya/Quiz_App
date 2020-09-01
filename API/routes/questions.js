const Questions = require('../Schemas/questionSchema');
const Quiz = require('../Schemas/quizSchema');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const path = require('path');

const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });

router.post('/add', [auth, upload.fields([{ name: 'image', maxCount: 1 }])], async (req, res) => {
  try {

    let link = "", type = "";

    console.log(req.files);

    console.log("--------------------------->")

    if (req.files['image']) {
      link = req.files['image'][0].path;
      type = "image";
    }

    let question = new Questions({
      question: req.body.question,
      answer: req.body.answer,
      options: req.body.options,
      media: {
        link: link,
        type: type
      }
    });
    question = await question.save();

    await Quiz.findOneAndUpdate({ quiz_id: req.body.quiz_id }, { $push: { questions: question._id } });

    res.json({ "status": "Question Created Successfully" });
  }
  catch (err) {
    console.log(req.body);
    console.log(err);
    res.status(500).json({ "status": "Question Creation failed" });
  }
});

router.get('/getAllQuestions', auth, async (req, res) => {

  try {

    let quiz = await Quiz.findOne({ quiz_id: req.query.quiz_id }, { questions: 1, _id: 0 });

    let questions = [];

    if (req.query.editMode == "true") {
      questions = await Questions.find({ _id: { $in: quiz.questions } }, { __v: 0 });
    } else {
      questions = await Questions.find({ _id: { $in: quiz.questions } }, { answer: 0, __v: 0 });
    }

    res.json(questions);
  }
  catch (err) {
    console.log(req.body);
    console.log(err);
    res.status(500).json({ "status": "Invalid Quiz ID" });
  }
});

router.put('/edit', auth, async (req, res) => {
  try {

    let question = {
      question: req.body.question,
      answer: req.body.answer,
      options: req.body.options
    };

    await Questions.findOneAndUpdate({ _id: req.body._id }, question);

    res.json({ "status": "Question Edited Successfully" });
  }
  catch (err) {
    console.log(req.body);
    console.log(err);
    res.status(500).json({ "status": "Question Edition failed" });
  }
});

module.exports = router; 