
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const RecruiterModel = require('../models/Recruiter');

const RecruiterSignup = async(req, res)=>{

    
    try {
        const {companyName, name, email, password, position } = req.body;

        const hashedPass = await bcrypt.hash(password, 10);
       
        const recruiter = await RecruiterModel.create({
            companyName,
            name,
            email,
            password: hashedPass,
            position,

        })
await recruiter.save();
 return res.status(201).json({ msg: "recruiter created", success: true});
    } catch (error) {
        
        res.status(500).json({
            success:false,
            msg:error.message,
            message:'Internal server error'
        })
    }
}


const RecruiterSignin = async (req, res) => {
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
        position:user.position,
       companyName: user.companyName,
       role: user.role
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


module.exports = {RecruiterSignup,RecruiterSignin}