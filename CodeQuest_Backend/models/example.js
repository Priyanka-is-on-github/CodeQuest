const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },

  example:[
{
  input :{ type:String, required:true},
  output: {type:String, required:true}
}
    
  ] ,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to update `updatedAt`
exampleSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Example = mongoose.model("Example", exampleSchema);
module.exports = Example;
