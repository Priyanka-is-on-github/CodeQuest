const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({

    name:{
         type: String,
    required: true,
    
    trim: true,
   index: true
    },
    logo: {
    type: String,
   
  },
   website: {
    type: String,
   
  },
foundedYear: {
    type: Date,
 required:true,
     
  },

     headquarters: {
    
    city: {
      type: String,
      required: true,
      trim: true
    },
   
    country: {
      type: String,
      required: true,
      trim: true
    },
},
sector: {
    type: String,
    required: true,
    enum: [
      'Technology',
      'Finance',
      'Healthcare',
      'Education',
      'Manufacturing',
      'Retail',
      'Other'
    ]
  },
size: {
    type: String,
    enum: [
      '1-10',
      '11-50',
      '51-200',
      '201-500',
      '501-1000',
      '1001-5000',
      '5001-10000',
      '10000+'
    ]
  },

  description:{
    type:String,
    required:true,
    
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDate: Date,
createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date



})

const CompanyModel = mongoose.model('Company', CompanySchema);
module.exports = CompanyModel;

