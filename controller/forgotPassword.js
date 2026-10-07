const students = require('../models/student')
const crypto  = require('crypto')
const bcrypt = require('bcrypt')
const resetPasswordTemplate = require('../utils/emailTemplate')
const sendEmail = require('../utils/sendEmail')

exports.ForgotPassword = async(req,res,next)=>{
          try{
               const {email} = req.body
               const user = await students.findOne({email})
               if(!user){
                return res.status(400).json({
                   success:false,
                   message:"user not found     jdfgyhusfgeyrs"
                })
               }
               //token generate karenge

               const resetToken = crypto.randomBytes(32).toString('hex')
               user.resetToken=resetToken
               user.resetTokenExpire=Date.now()+10*60*1000
               //ise database mai save kar denge
               await user.save()
               const resetlink = `http://localhost:4000/api/v1/students?token=${resetToken}`
               const html = resetPasswordTemplate(resetlink)
                await sendEmail(email,"Password reset request ",html)
               return res.status(200).json({
    success: true,
    message: "passsword link has been sent to mail"
    //resetToken:resetToken
    //resetToken: resetToken
})
          }
          //yadi email exist karta hai to hum token generate  karenge

          catch(error){
             next(error)
          }
}
exports.resetPassword = async(req,res,next)=>{
    try{
        const {email,password,resetToken} = req.body
               const user = await students.findOne({
                  email,
                  resetToken:resetToken
                  
                })
               console.log(user)
               //console.log(resetToken)
               if(!user){
                return res.status(400).json({
                   success:false,
                   message:"user not found"
                })
               }
            
              //token check karegnge
               if(user.resetTokenExpire<Date.now())
               {
                   return res.status(400).json({
                     success:false,
                     message:"resettoken has expired"
                   })
               }
              //passsword ko hash karenge
              const hashedPassword =  await bcrypt.hash(password,10)
               //ab hum db mai save kar denge 
               await students.findByIdAndUpdate(
                user._id,
                {
                password:hashedPassword,
                $unset: {
                    resetToken: 1,
                  resetTokenExpire: 1
                  }
                }
               )
               return res.status(200).json({
                success:true,
                message:'password are ready to  updated '
               })


              //password ko save karenge

    }
    catch(error)
    {
      next(error)
    }
}