const jwt = require('jsonwebtoken')
const student = require('../models/student')
require('dotenv').config()
exports.userAuth = async(req,res,next)=>{
    try{
         const token = req.cookies.token
         if(!token){
            return res.status(400).json({
                success:false,
                message:"token is not found"
            })
         }
         const jwtVerify  = jwt.verify(token,process.env.JWT_SECRET)
         req.user= jwtVerify
         next()
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.isAdmin = async(req,res,next)=>{
    try{
        const user = await student.findById(req.user.id)
        if(user.role !="admin"){
            return res.status(400).json({
                success:false,
                message:"access denied"
            })
        }
        next()

    }
    catch(error){
        return res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
