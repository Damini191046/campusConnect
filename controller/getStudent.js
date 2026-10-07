const students = require('../models/student')
exports.getAllStudents = async(req,res)=>{
      try{
        
      
       const  page = parseInt(req.query.page)||1
       const   limit = parseInt(req.query.limit)||10
       //ye humne pagination ko implement kia hai
       const skip = (page-1)*limit
       const filter={}
       const search = req.query.search ||""
       const branch = req.query.branch ||""
       const sort = req.query.sort||"name"
       const allowedSortFields = [
          "name",
          "email",
          "enrollmentNo",
          "branch"
       
        ]
        const sortBy = allowedSortFields.includes(sort)?sort:"name"
       const order = req.query.order==="desc"?-1:1
       if(search){
              filter.$or=
          [  
          
          {name:{$regex:search,$options:"i"}},
           {email:{$regex:search,$options:"i"}
          }
          ]

       }
       if(branch){
          filter.branch = {
            $regex :`^${branch}$`,
            $options:"i"
          }
       }
        const  list = await students.find(filter)
                       .skip(skip)
                       .limit(limit)
                       .sort({[sortBy]:order})
                       .select("-password -resetToken -resetTokenExpire")
      const totalStudents = await students.countDocuments(filter)
      const totalPage = Math.ceil(totalStudents/limit)
      //list.passwod=undefined

      
      //ab hum documnet mai number of students kitne hai 

       return res.status(200).json({
        success:true,
        currentPage:page,
        limit:limit,
        data:list,
        totalPages:totalPage,
        totalStudents:totalStudents
       })
    }
      catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
      }
}