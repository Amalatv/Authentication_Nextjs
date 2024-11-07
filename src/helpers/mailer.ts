import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendMailer = async({email, emailType, userId}: any) => {
    try {
        //create a hashed token
       const hashedToken = await bcryptjs.hash(userId.toString(), 10)
       
       if (emailType === "VERIFY") {
           //update
       await User.findByIdAndUpdate(userId,
           {verifyToken: hashedToken, verifyTokenExpiry:
            Date.now() + 360000})
       } else if (emailType === "RESET") {
            //update
       await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry:
            Date.now() + 360000})
       }


      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "maddison53@ethereal.email",
          pass: "jn7jnAPss4f63QBp6D",
        },
      })

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/
        verifyemail?token=${hashedToken}">here</a> to 
        ${emailType === "VERIFY" ? "Verify your email" :
            "reset your password"
        }</p>`
      }

      const mailresponse = await transport.sendMail
      (mailOptions);
      return mailresponse;
      
    } catch (error: any) {
        throw new Error(error.message)
    }
}