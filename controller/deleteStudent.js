const students = require('../models/student')
exports.deleteStudent = async(req,res)=>{
     try{

        const {id}= req.params
        const user = await students.findByIdAndDelete(id)
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"user is not found to the corresponding id "

            })
        }
        return res.status(200).json({
            success:true,
            message: "user delete successfully"
        })
        
     }
     catch(error){
          return res.status(500).json({
            success:false,
            message:error
          })
     }

}