const express = require('express')
require('dotenv').config();

const cookieParser = require('cookie-parser')
const studentRoute = require('./route/studentRoute')
const connectDB = require('./config/database')
const errorHandler = require('./middlewares/errorHandler')
//middleware ko call karenge
const app = express()
//ab hum server ko activate karenge

// JSON data ko read karne ke liye middleware
app.use(express.json());
app.use(cookieParser())

connectDB()


///ye route ko submit karne ke liye use karte hai
app.get('/',(req,res)=>{
    res.send("server activate at port 4000")
})
app.use('/api/v1/students',studentRoute)
app.use(errorHandler)
app.listen(4000,()=>{
     console.log("servaer activate successfully")
})