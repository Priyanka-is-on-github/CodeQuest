
import { Verification_Email_Template, Welcome_Email_Template } from '../libs/EmailTemplates';
import {transporter} from './Email.config'

export const SendVerificationCode = async(email, verificationCode)=>{

    try {
         const response = await transporter.sendMail({
    from: '"CodeQuest" <priyankasingh8885@gmail.com>',
    to: email,
    subject: "Verify your Email",
    text: "Verify your Email", // plain‑text body
    html: Verification_Email_Template.replace("{verificationCode}", verificationCode), // HTML body
  });
  console.log("Email send successfully", response)
    } catch (error) {
        
        console.log("Email error")
    }
}
export const WelcomeEmail = async(email, name)=>{

    try {
         const response = await transporter.sendMail({
    from: '"CodeQuest" <priyankasingh8885@gmail.com>',
    to: email,
    subject: "Welcome to CodeQuest!",
    text: "Welcome to CodeQuest!", // plain‑text body
    html: Welcome_Email_Template.replace("{name}", name), // HTML body
  });
  console.log("Email send successfully", response)
    } catch (error) {
        
        console.log("Email error")
    }
}


