                    const  student = require('../models/student')
                    const bcrypt = require('bcrypt')
                    exports.createStudent=async(req,res,next)=>{
                        try{
                                //throw new Error("checing error")

                            const {name,email,enrollmentNo,password,profileImage, branch,role}=req.body
                            if(!name||!email||!enrollmentNo||!password
                                ||!branch
                            ){
                                    return res.status(400).json({
                                        success:false,
                                        message:"Enter the specific details"
                                    })
                            }
                             const  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            if(!emailRegex.test(email)){
                                return res.status(400).json({
                                    success:false,
                                    message:"email format is not appropriate"
                                })
                            }
                            if(await student.findOne({email})){
                                return res.status(409).json({
                                    success:false,
                                    message:"User already exist"
                                })
                            }
                            if(password.length < 6){
                                return res.status(400).json({
                                success: false,
                                message: "Password must be at least 6 characters"
                            })
                            }
                            const hashedpassword= await bcrypt.hash(password,10)
                            //existing enrollment ke liye 
                            const existingUser = await student.findOne({enrollmentNo}).select('-password')
                            
                            if(existingUser){
                                return res.status(409).json({
                                    success:false,
                                    message:"Enrollment No is already exist"
                                })
                            }
                           
                            //ab hum hamari value ko database mai enter karwaenge
                            const user = await student.create({
                                name,
                                email,
                                enrollmentNo,
                                password:hashedpassword, 
                                profileImage,
                                branch,
                                role
                            })
                            user.password = undefined
                            return res.status(200).json({
                            success: true,
                            message: "Student created successfully",
                            data: user
                            });
                                                                                        
                        }
                        catch(error){
                            next(error)
                        }
                    }
                    exports.getProfile = async(req, res)=>{                                                                                                                              
                        try{
                            const user = await student.findById(req.user.id).select("-password -resetToken -resetTokenExpire")
                            return res.status(200).json({
                                success:true,
                                message:"login fetch succesfully",
                                data:user
                            })
                        }
                        catch(error){
                            next(error)
                        }
                    }