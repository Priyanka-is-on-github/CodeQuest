

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




 



module.exports = transporter ;
