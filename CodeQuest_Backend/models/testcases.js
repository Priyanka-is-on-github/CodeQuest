const mongoose = require('mongoose')

const testcasesSchema = new mongoose({

    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Question'
    },

      testcase:[
{
  input :{ type:String, required:true},
  output: {type:String, required:true},
  explanation:{type:String, required:true}
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
})

// Add a pre-save hook to update `updatedAt`
testcasesSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
}); 

const TestCasesModel = mongoose.model('testcase', testcasesSchema)
module.exports = TestCasesModel;