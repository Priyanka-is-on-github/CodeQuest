const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Question'
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});



const Example = mongoose.model("Example", exampleSchema);
module.exports = Example;
