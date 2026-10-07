const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})
const sendEmail = async(to,subject,html)=>{
    await transporter.sendMail({
        from:process.env.USER_EMAIL,
        to:to,
        subject:subject,
        html:html
         
    })

}
module.exports=sendEmail