const students= require('../models/student')
const cloudinary = require('../config/cloudinary')
exports.uploadProfile=async(req,res,next)=>{
    try{
           if(!req.file){
               return res.status(400).json({
               success:false,
               message:"Profile image is required"
              })
            }
          console.log(req.file);
          
          const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            {
                folder:"student-profile-images"
            }
          )
          console.log(result)
          const user = await students.findByIdAndUpdate(
            req.user._id,
            {
                profileImage:result.secure_url
            },
            {new:true}
          )
          return res.status(200).json({
            success:true,
            message:"file upload successfully",
            image_url:result.secure_url
          })
    }  
    catch(error){
        next(error)
    }
}