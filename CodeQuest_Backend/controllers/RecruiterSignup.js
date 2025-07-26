const RecruiterModel = require("../models/recruiter");
const bcrypt = require('bcrypt')


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
module.exports = RecruiterSignup