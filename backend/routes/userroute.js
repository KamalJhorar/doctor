
import express from 'express'
import { registeruser,loginuser, getprofile, updateprofile, bookAppointment, listappointment, cancelappointment, paymentrazorpay, verifyrazorpay } from '../controller/usercontroller.js'
import authuser from '../middleware/authuser.js'
import multer from 'multer'
import upload from '../middleware/multer.js'


const userRouter= express.Router()



userRouter.post('/register',registeruser)
userRouter.post('/login',loginuser)
userRouter.get('/get-profile',authuser,getprofile)
userRouter.post('/update-profile',authuser,upload.single('image'),updateprofile)
userRouter.post('/book-appointment',authuser,bookAppointment)
userRouter.post('/cancel-appointment',authuser,cancelappointment)
userRouter.get('/appointments',authuser,listappointment)
userRouter.post('/payment-razorpay',authuser,paymentrazorpay)
userRouter.post('/verify-razorpay',authuser,verifyrazorpay)




  

export default userRouter