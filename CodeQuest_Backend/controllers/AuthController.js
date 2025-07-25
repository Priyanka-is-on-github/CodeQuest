const bcrypt = require("bcrypt");
const DeveloperModel = require("../models/Developer");
const jwt = require('jsonwebtoken');
const { SendVerificationCode, WelcomeEmail } = require("../middlewares/Email");



// / All valid formats:
// jwt.sign(payload, secret, { expiresIn: '1m' });   // 1 minute
// jwt.sign(payload, secret, { expiresIn: '1h' });   // 1 hour
// jwt.sign(payload, secret, { expiresIn: '2d' });   // 2 days
// jwt.sign(payload, secret, { expiresIn: 60 });     // 60 seconds

const Developersignup = async (req, res) => {
 
 try {

 const { name, email, password, degree, role, collegeName, adharNumber, verificationCode } = req.body;
    


      const userExist = await DeveloperModel.findOne({ email });
    
      if(userExist && !userExist.isVerified)
      {
        return res.status(401).json({msg:"Verify your Email", success:false})
      }

      if (userExist) {

        return res
          .status(409)
          .json({ msg: "email already exists you can login", success: false });
      }


      // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const user = await DeveloperModel.create({
      name,
      email,
      password,
      degree,
      role,
      collegeName,
      adharNumber,
      // verificationCode,
});

    await user.save();
   await SendVerificationCode(user.email, verificationCode)

    return res.status(201).json({ msg: "user created", success: true});


  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });c
  }
};
const Developersignin = async (req, res) => {
  const { password } = req.body;
const user = req.user; // From middleware
 
  try {
const isPassEqual = await bcrypt.compare(password, user.password)
  
if(!isPassEqual)
{
   return res.status(401).json({ msg: "invalid email and password", success: false});
}
    
// 3. Generate JWT 
    const jwtToken = jwt.sign(
      { 
        email: user.email, 
        _id: user._id 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' } 
    );

   
    return res.status(200).json( { msg: "Authentication successful",
      success: true,
      token: jwtToken, 
      user: {          
        email: user.email,
        name: user.name,
        id: user._id,
        role:user.role,
        degree: user.degree,
        collegeName: user.collegeName
      }});


  } catch (error) {
 console.error('Signin Error:', error); // Better error logging
    
    return res.status(500).json({ 
      msg: "Authentication failed", 
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });

   
  }
};



const VerifyEmail = async(req, res)=>{
  try {
    const {Email} = req.body;
    const user = await DeveloperModel.findOne({
      email:Email
    })

    if(!user){
      
      return res.status(400).json({success:false, msg:"Invalid or Expired code"})
    }

    user.isVerified =  true;
    // user.verificationCode=undefined;
    await user.save()
    await WelcomeEmail(user.email, user.name)

return res.status(200).json({success:true, msg:"Email verified successfully"})

  } catch (error) {
     return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
}

const ResendVerificationCode = async(req, res)=>{

try {
  
  const {Email, OTP} = req.body;
 
   
   await SendVerificationCode(Email, OTP)

    return res.status(200).json({ msg: "code sended succesfully", success: true, user });

 } catch (error) {
   return res.status(500).json({ msg: error, success: false });
}
}

module.exports = {
  Developersignin,
  Developersignup,
  VerifyEmail,
  ResendVerificationCode,
};
