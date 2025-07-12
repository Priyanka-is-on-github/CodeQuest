const DeveloperModel = require("../models/Developer");

const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "priyankasingh8885@gmail.com",
    pass: "steq djex woax tvec",
  },
});
module.exports = transporter




 


async function signinValidation(req, res, next) {
  const { email} = req.body;



  try {

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ 
        msg: "Invalid email and password", // More professional message
        success: false,
        code: "User not found" // Standard error code for client-side handling
      });
     
    }

    // Attach user to request for later use
    req.user = user;
    next();

  } catch (error) {
    console.error('Signin Validation Error:', error);
    return res.status(500).json({ 
      msg: "Authentication service unavailable", 
      success: false,
      code: "SERVER_ERROR"
    });
  }



 
}

module.exports = {  signinValidation, transporter };
