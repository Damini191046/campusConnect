const mongoose = require('mongoose')

const dbConnect = ()=>{
     mongoose.connect(process.env.DATABASE_URL)
     .then(()=>{
           console.log("Database connected successfully")
     })
     .catch((error)=>{
          console.log("connection not successfully")
          console.log(error);
     })
}
module.exports=dbConnect