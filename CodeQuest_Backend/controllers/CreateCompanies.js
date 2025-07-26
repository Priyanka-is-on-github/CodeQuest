const CompanyModel = require("../models/Company");

const CreateCompanies = async (req, res) => {
  try {

    const {
      name,
      logo,
      website,
      foundedYear,
      description,
      headquarters,
      sector,
      size,
    } = req.body;

    const exitName = await CompanyModel.findOne({
      name,
    });

    if (!exitName) {
      const newCompany = await CompanyModel.create({
        name,
        logo,
        website,
        foundedYear,
        description,
        headquarters: {
          city: headquarters.city.trim(),
          country: headquarters.country.trim(),
        },
        sector,
        size,
      });

      // Successful response
      return res.status(201).json({
        success: true,
        message: "Company created successfully",
        data: {
          id: newCompany.id,
          name: newCompany.name,
          website: newCompany.website,
          sector: newCompany.sector,
          created: newCompany.createdAt,
        },
      });
    } else {
      const updatedCompany = await CompanyModel.updateOne({
        name,
        logo,
        website,
        foundedYear,
        description,
        headquarters: {
          city: headquarters.city.trim(),
          country: headquarters.country.trim(),
        },
        sector,
        size,
      });

      // Successful response
      return res.status(201).json({
        success: true,
        message: "Company updated successfully",
        data: {
          id: updatedCompany.id,
          name: updatedCompany.name,
          website: updatedCompany.website,
          sector: updatedCompany.sector,
          created: updatedCompany.createdAt,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      msg: error.message,
    });
  }
};



const VerifyCompany = async(req, res)=>{

    
    try {
        
        const {name} = req.body;

        const company = await CompanyModel.findOne({ name});

        if(!company){
return res.status(400).json({success:false, msg:"company Name does not exits"})
        }else
        {
            company.isVerified =  true;
            res.status(200).json({msg:'Verified'})
        }
        
        

    await company.save();

    } catch (error) {
        res.status(500).json({
      success: false,
      message: "Internal server error",
      msg: error.message,
    });
    }
}
module.exports = {CreateCompanies, VerifyCompany}
