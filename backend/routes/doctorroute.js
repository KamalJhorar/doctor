

import express from 'express'
import { appointmentcomplete, appointmentdoctor, doctordashboard, doctorList, doctorprofile, logindoctor, updatedoctorprofile } from '../controller/doctorcontroller.js'
import authDoctor from '../middleware/authDoctor.js'
import { appointmentcancel } from '../controller/admincontroller.js'

const doctorRouter= express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',logindoctor)
doctorRouter.get('/appointments',authDoctor,appointmentdoctor)
doctorRouter.post('/complete-appointments',authDoctor,appointmentcomplete)
doctorRouter.post('/cancel-appointments',authDoctor,appointmentcancel)
doctorRouter.get('/dashboard',authDoctor,doctordashboard)
doctorRouter.get('/profile',authDoctor,doctorprofile)
doctorRouter.post('/update-profile',authDoctor,updatedoctorprofile)








export default doctorRouter