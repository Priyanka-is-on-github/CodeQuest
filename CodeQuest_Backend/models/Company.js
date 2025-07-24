const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

})

const CompanyModel = mongoose.model('Company', CompanySchema);
module.exports = CompanyModel;

