import nodemailer from 'nodemailer'
import User from '@/models/user.models'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({email,emailType, userId}:any) =>{
    try {
        //create hash token
      const hashedToken = await  bcryptjs.hash(userId.toString(), 10) //toString() isliye cz kbhi mongoDb is BSON me data aajaye to  
      
      if(emailType === "VERIFY")
      {
         await User.findByIdAndUpdate(userId, 
            {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now()+ 3600000
            }
          )
      }
      else if(emailType === "RESET")
      {
        console.log({ expiryAsDate: new Date(Date.now() + 3600000) });
        await User.findByIdAndUpdate(userId, 
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now()+ 3600000
            }
          )
      }

        // Looking to send emails in production? Check out our Email API/SMTP product!
       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
            }
        });
      const mailOptions = {
        from: 'avi@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href= "${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "changePassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email": "reset your password"}
        or copy and paste the link below in your browser, <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "changePassword"}?token=${hashedToken}
        </p>`
      }

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse
    
    } catch (error:any) {
        throw new Error(error.message)
    }
}