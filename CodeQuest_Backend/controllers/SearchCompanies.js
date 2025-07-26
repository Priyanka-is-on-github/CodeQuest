
const CompanyModel = require('../models/Company')
const  SearchCompanies= async(req, res) =>{
  

    try {
     
        const {query} = req.query;

        const company = await CompanyModel.findOne({name: query});



   if(company === null ){
    res.status(401).json({
        success: false,
        msg:"Name not found",

    })
    return;
   }
        res.status(200).json({
            success:true,
            
           data: company,
        })

    } catch (error) {
        console.log('c=', error)
        res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
    }
}

module.exports = SearchCompanies