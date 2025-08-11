const mongoose = require('mongoose');

const IntershipSchema = mongoose.Schema({
  companyName: String,
  internshipTitle: String,
  internshipDescription: String,
  internshipDuration: String,
  location: String,
  stipend: String,
  internshipImage: String,
  companyLogo: String,
  isPublished:{
    type:Boolean,
    default:false,
  },
  testDuration: String,
  startDateTime: String,
  endDateTime: String
});

const InternshipModel = mongoose.model('Internship', IntershipSchema);

module.exports = InternshipModel;