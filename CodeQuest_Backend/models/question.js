const mongoose = require("mongoose");

const codingQuestionSchema = new mongoose.Schema({
    
  testId: {
    type: mongoose.Schema.Types.ObjectId,// Assuming testId references a Test document
    ref: "Test",// Replace "Test" with the actual model name if different
    required: true,
  },
  questionTitle: {
    type: String,
    required: false,
    trim: true,
  },
  questionDescription: {
    type: String,
    required: false,
    trim: true,
  },

  questionDificulty: {
    type: String,
    enum:["easy", 'medium',"hard"],// Restricts values to easy, medium, or hard
    required: true,
  },

  createdAt:{
    type: Date,
    default:Date.now,
  },

  updatedAt:{
    type:Date,
    default: Date.now,
  }
});

// Add a pre-save hook to update `updatedAt`
codingQuestionSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
  });

const Question = mongoose.model('Question', codingQuestionSchema )
module.exports = Question;