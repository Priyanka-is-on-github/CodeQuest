const {mongoose} = require('mongoose')

const DeveloperFormSchema =  mongoose.Schema({
 companyLogo: String,
  companyName: String,
  education: String,
  email: String,
  endDate: Date,
  experience: String,
  fullName: String,
  github: String,
  internshipId: String,
  phone: String,
  skills: String,
  startDate: Date,
  terms: Boolean
}, { timestamps: true });


const DeveloperFormModel = mongoose.model('developerform', DeveloperFormSchema);

module.exports = DeveloperFormModel;