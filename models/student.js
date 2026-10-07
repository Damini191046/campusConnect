const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true
    },

    enrollmentNo: {
        type: String,
        required: true
    },

    branch: {
        type: String,
        required: true
    }
    ,
    role:{
        type:String,
        enum:["student","admin"],
        default:"student"
    },
    resetToken:{
        type:String,

    },
    resetTokenExpire:{
        type:Date
    }
});

module.exports = mongoose.model("Student", studentSchema);