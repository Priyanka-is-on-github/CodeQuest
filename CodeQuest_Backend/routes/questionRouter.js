const express = require("express");
const Question = require("../models/question");
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Example = require("../models/example");
const TestCasesModel= require("../models/testcases");

const router = express.Router();

router.post("/", async (req, res) => {
  const { difficulty } = req.query;

  const { internshipId, title, description } = req.body;

// console.log('d=',internshipId, title, description)

  try {
    const response = await Question.create({
      internshipId,
      questionTitle: title,
      questionDescription: description,
      questionDificulty: difficulty,
    });

    res.status(201).json(response._id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/get", async (req, res) => {
  const { internshipId} = req.query;

  const allQuestion = await Question.find({
    internshipId,
  });

 

  res.status(200).json(allQuestion);
});

router.post("/questiondetail", async (req, res) => {
  const { difficulty } = req.query;

  const { internshipId, title, description, isPublished} = req.body;



  // 1. Validate inputs
  if (!difficulty || !mongoose.Types.ObjectId.isValid(internshipId)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid difficulty or internship ID' 
    });
  }

  

  try {
    const prevQuestionDetail = await Question.findOne({
      internshipId: internshipId,
      questionDificulty: difficulty,
    });

    console.log('p=',prevQuestionDetail)
    const updatedQuestionDetail = {
      questionTitle: title != '' ? title : prevQuestionDetail.questionTitle,
      questionDescription: description != ''? description: prevQuestionDetail.questionDescription,
      isPublished: isPublished !=false ? isPublished: prevQuestionDetail.isPublished,
    };

    const response = await Question.findOneAndUpdate(
      { internshipId: internshipId, questionDificulty: difficulty },
      {
        questionTitle: updatedQuestionDetail.questionTitle,
        questionDescription: updatedQuestionDetail.questionDescription,
        isPublished: updatedQuestionDetail.isPublished,
      },
      { new: true }
    );


    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/questiondetail", async (req, res) => {
  const { difficulty, internshipId } = req.query;


  // Validate query parameters
  if (!difficulty || !internshipId) {
    return res.status(400).json({
      success: false,
      message: 'Both difficulty and internshipId are required'
    });
  }

  try {
    const question = await Question.findOne({
      internshipId,
      questionDificulty: difficulty // Fixed typo from "questionDificulty"
    }).lean();

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    const examples = await Example.find({ 
      questionId: question._id 
    }).lean();

    const testcases = await TestCasesModel.find({
        questionId: question._id 
    })


    res.status(200).json({
      success: true,
      response: question,
      examples, testcases
    });

  } catch (error) {
    console.error('Error in questiondetail:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
module.exports = router;
