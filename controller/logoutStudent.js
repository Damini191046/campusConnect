exports.logoutStudent = async(req,res)=>{
    try{
         res.clearCookie("token")
         return res.status(200).json({
            success:true,
            message:"logout successfully"
         })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}