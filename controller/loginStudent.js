const student = require('../models/student')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
exports.loginStudent = async(req,res)=>{
    try{ 
        const {email,password}= req.body
        //pehle hum email find karenge ki vo exist karta hai ya nahi
        const user = await student.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"email is not found you need to signUp first "
            })
        }
        //payload banaenge token ke liye
        const payload = {
            id:user._id,
            email:user.email
        }
        //now we check first password
        if(await bcrypt.compare(password,user.password)){
            //agar hamara password sahi hai to hum token generate karenge
             let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2hr'

             })
               // Mongoose document mein token save karo
    user.token = token;
    await user.save();

    // Response ke liye normal object banao
    const userResponse = user.toObject();

    // Password hide karo
    userResponse.password = undefined;
    userResponse.resetToken = undefined;
    userResponse.resetTokenExpire = undefined;
        const option = {
            expires:new Date(Date.now()+2*24*60*60*1000),
            httpOnly: true
        }
        res.cookie("token",token,option).status(200).json({
            success:true,
           // token,
            user:userResponse,
            message:"user login successfully"
        })
            
        }
        else{
            return res.status(400).json({
                success:false,
                message:"password not found"
            })
        }
       

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}