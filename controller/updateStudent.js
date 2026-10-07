const students =  require('../models/student')
exports.updateStudent =  async(req,res)=>{
    try
    {
         const {name,email,enrollmentNo,password,profileImage, branch}=req.body
        const {id}=req.params
        

    
    
        const user = await students.findByIdAndUpdate(
            id,
            {
                name,
                email,
                enrollmentNo,
                password,
                profileImage,
                branch
            },
            {new:true}

        )
        if(!user){
         return res.status(400).json({
            success:false,
            message:"id is not exist"
         })
        }
        return res.status(200).json({
             success:true,
             message:"update successfully"

        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
