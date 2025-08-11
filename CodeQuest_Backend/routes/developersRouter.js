const express = require("express");
const DeveloperFormModel = require("../models/DeveloperForm");
const InternshipModel = require("../models/Intership");

const router = express.Router();

router.post("/developer-form", async (req, res) => {
  try {
    const {
          internshipId,
      companyLogo,
      companyName,
      education,
      email,
      enddate,
      startDate,
      experience,
      fullName,
      github,
        phone,
      skills,
      
      terms,
    } = req.body;

    const response = await DeveloperFormModel.create({
     internshipId,
      companyLogo,
      companyName,
      education,
      email,
      enddate,
      startDate,
      experience,
      fullName,
      github,
        phone,
      skills,
      
      terms,

    });

    res.status(201).json({
      message: "Form created successfully",
      success: true,
    });


  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      msg: "Internal server error",
    });
  }
});


router.get('/internships', async(req, res)=>{

    try {
        
        const {email} = req.query;
   

      const response = await DeveloperFormModel.find(
  { email:email }
  
);


const internshipIds = response.map(doc => doc.internshipId);

// 2. Get all internships matching these IDs
    const internships = await InternshipModel.find({
      _id: { $in: internshipIds }
    });

res.status(201).json({
      message: "got successfully",
      success: true,
      data: internships
    });

    } catch (error) {
          res.status(500).json({
      message: error.message,
      success: false,
      msg: "Internal server error",
    });
    }
})

module.exports = router;
