const express = require("express");
const Question = require("../models/question");

const router = express.Router();

router.post("/", async (req, res) => {
  const { dificulty } = req.query;

  const { testId, title, description } = req.body;

  try {
    const response = await Question.create({
      testId,
      questionTitle: title,
      questionDescription: description,
      questionDificulty: dificulty,
    });

    res.status(201).json(response._id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/get", async (req, res) => {
  const { testId } = req.query;

  const allQuestion = await Question.find({
    testId,
  });

 

  res.status(200).json(allQuestion);
});

router.post("/questiondetail", async (req, res) => {
  const { dificulty } = req.query;

  const { testId, title, description } = req.body;

   if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({ error: 'Invalid test ID format' });
    }

  try {
    const prevQuestionDetail = await Question.findOne({
      testId: new mongoose.Types.ObjectId(testId),
      questionDificulty: dificulty,
    });

    const updatedQuestionDetail = {
      questionTitle: title != null ? title : prevQuestionDetail.questionTitle,
      questionDescription:
        description != null
          ? description
          : prevQuestionDetail.questionDescription,
    };

    const response = await Question.findOneAndUpdate(
      { testId: new mongoose.Types.ObjectId(testId), questionDificulty: dificulty },
      {
        questionTitle: updatedQuestionDetail.questionTitle,
        questionDescription: updatedQuestionDetail.questionDescription,
      },
      { new: true }
    );

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/questiondetail", async (req, res) => {
  const { dificulty, testId } = req.query;

  try {
    const response = await Question.findOne({
      testId,
      questionDificulty: dificulty,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
