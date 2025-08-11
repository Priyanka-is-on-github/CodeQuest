const InternshipModel = require("../models/Intership");

const IntershipsController = async (req, res) => {
  try {
    const {
      companyName,
      internshipTitle,
      internshipDescription,
      internshipDuration,
      location,
      stipend,
      internshipImage,
      companyLogo,
      testDuration,
      startDateTime,
      endDateTime,
      isPublished,
    } = req.body;

    const newInternship = await InternshipModel.create({
      companyName,
      internshipTitle,
      internshipDescription,
      internshipDuration,
      location,
      stipend,
      internshipImage,
      companyLogo,
      isPublished,
      testDuration,
      startDateTime,
      endDateTime,
    });

    res.status(201).json({
      message: "Intership created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      msg: "Internal server error",
    });
  }
};

const getInternships = async (req, res) => {
  const { companyName } = req.query;
  try {
    const response = await InternshipModel.find({
      companyName,
    });

    res.status(200).json({
      success: true,
      message: "Successful",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      msg: "Internal server error",
    });
  }
};
const getInternshipLogo = async (req, res) => {
  const { companyName } = req.query;
  try {
    const response = await InternshipModel.findOne({
      companyName,
    });

    res.status(200).json({ logo: response.companyLogo });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      msg: "Internal server error",
    });
  }
};

const putIspublished = async (req, res) => {
  try {
    const { internshipId, isPublished } = req.body;


    const response = await InternshipModel.findOneAndUpdate(
      {
        _id: internshipId,
      },
      {
        isPublished: isPublished,
      }
    );

    console.log("publish=", response);
    res.status(201).json(
     response
    );
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      msg: "Internal server error",
    });
  }
};
const deleteInternship = async () => {
  try {
    const { internshipId } = req.query;

    const response = await InternshipModel.findOneAndDelete({
      _id: internshipId,
    });

    console.log("deleteinternhip=", response);

    res.status(204).json({
      msg: "deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      msg: "Internal server error",
    });
  }
};


const Internships = async (req, res) => {
  try {
    const internships = await InternshipModel.find({
      isPublished: true
    });

   
    
    return res.status(200).json({
      success: true,
      message: "Internships fetched successfully",
      data: internships,
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
const InternshipById = async (req, res) => {
  try {
    const {id} = req.query;
    const internship = await InternshipModel.findById( id);
     
    

   
    
    return res.status(200).json({
      success: true,
      message: "Internship fetched successfully",
      data: internship,
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


module.exports = {
  IntershipsController,
  getInternships,
  getInternshipLogo,
  putIspublished,
  deleteInternship,
  Internships,
  InternshipById
};
