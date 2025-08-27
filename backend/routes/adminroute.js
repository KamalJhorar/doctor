
import express from 'express'
import { addDoctor,admindashboard,alldoctor,appointmentAdmin,appointmentcancel,loginAdmin } from '../controller/admincontroller.js'
import authAdmin from '../middleware/authAdmin.js'
import upload from '../middleware/multer.js'
import { changeavialability } from '../controller/doctorcontroller.js'

const adminRouter= express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,alldoctor)
adminRouter.post('/change-availability',authAdmin,changeavialability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.get('/dashboard',authAdmin,admindashboard)
adminRouter.post('/cancel-appointment',authAdmin,appointmentcancel)






export default adminRouter