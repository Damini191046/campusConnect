const students = require('../models/student');
exports.getStudentById = async(req,res)=>
    {
       try{
            const {id} = req.params
            const user  = await students.findById(id).select("-password")
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:" Email id not found to the corresponding user"
                })
            }
        return res.status(200).json({
            success:true,
            data:user
        })
       }
       catch(error){
        return res.status(500).json({
            success:true,
            message:error
        })
       }
    }
