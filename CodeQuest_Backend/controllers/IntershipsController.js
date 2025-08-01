const InternshipModel = require("../models/Intership");




const IntershipsController = async(req, res)=>{


    try {
         const {companyName, internshipTitle, internshipDescription,internshipDuration,location ,stipend,internshipImage, companyLogo, testDuration,startDateTime,endDateTime} = req.body;

         const newInternship = await InternshipModel.create({
            companyName,
            internshipTitle, 
            internshipDescription,
            internshipDuration,
            location ,
            stipend,
            internshipImage, 
            companyLogo, 
            testDuration,
            startDateTime,
            endDateTime

         })

         res.status(201).json({
            message:'Intership created successfully',
            success:true,
           
            
         })

    } catch (error) {
        
        res.status(500).json({
            message: error.message,
            success:false,
            msg:'Internal server error'
        })
    }
}


const getInternships = async(req, res)=>{

    const {companyName} = req.query;
    try {
        const response = await InternshipModel.find({
            companyName
        })

      res.status(200).json({
        success:true,
        message:'Successful',
        data: response
       
        
      })

    } catch (error) {
         res.status(500).json({
            message: error.message,
            success:false,
            msg:'Internal server error'
        })
    }
}
const getInternshipLogo = async(req, res)=>{

    const {companyName} = req.query;
    try {
        const response = await InternshipModel.findOne({
            companyName
        })

      
      res.status(200).json({logo:response.companyLogo})

    } catch (error) {
         res.status(500).json({
            message: error.message,
            success:false,
            msg:'Internal server error'
        })
    }
}
module.exports ={ IntershipsController, getInternships, getInternshipLogo};