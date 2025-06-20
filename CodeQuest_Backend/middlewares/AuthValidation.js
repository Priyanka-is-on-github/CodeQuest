const UserModel = require("../models/user");

async function signupValidation(req, res, next) {
  const { email } = req.body;

  const userExist = await UserModel.findOne({ email });

  if (userExist) {
    return res
      .status(409)
      .json({ msg: "email already exists you can login", success: false });
  }

  next();
}
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

module.exports = { signupValidation, signinValidation };
