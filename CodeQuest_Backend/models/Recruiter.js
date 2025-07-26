const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema({

   companyName: {
    type: String,
    required: true, 
   
  },
  name: {
    type: String,
    required: true, 
  

  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  
  },
  password: {
    type: String,
    required: true,
    
  },
  position: {
    type: String,
    required: true, 
   
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
 

})

const RecruiterModel = mongoose.model('Recruiter', RecruiterSchema)
module.exports = RecruiterModel