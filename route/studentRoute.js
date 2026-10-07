const {createStudent,getProfile} = require('../controller/student.Controller')
const express = require('express')
const router = express.Router()
const {getAllStudents } =  require('../controller/getStudent')
const {getStudentById}=require('../controller/getStudentById')
const {updateStudent}=require('../controller/updateStudent')
const {deleteStudent}=require('../controller/deleteStudent')
const {loginStudent}=require('../controller/loginStudent')
const {userAuth,isAdmin}=require('../middlewares/auth')
const upload=require('../middlewares/multer')
const {logoutStudent} = require('../controller/logoutStudent')
const  {uploadProfile}=require('../controller/uploadProfileImage')
const {ForgotPassword,resetPassword}=require('../controller/forgotPassword')
router.post('/login', loginStudent)
router.post('/logout', logoutStudent)
router.post('/create', createStudent)
router.get('/list', getAllStudents)
router.get('/profile', userAuth, getProfile)
router.put(
    '/profile-image',
    userAuth,
    upload.single('profileImage'),
    uploadProfile
)
router.post('/forgotpassword',ForgotPassword)
router.post('/resetpassword',resetPassword)
router.get('/:id', getStudentById)
router.put('/:id', updateStudent)
router.delete('/:id', userAuth, isAdmin, deleteStudent)

module.exports = router