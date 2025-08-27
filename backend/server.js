import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminroute.js'
import doctorRouter from './routes/doctorroute.js'
import userRouter from './routes/userroute.js'

// app config
const app = express()
const port=process.env.PORT || 4000
connectDB()
connectcloudinary()


//  middlewares
app.use(express.json())
app.use(cors())



// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
// localhost:4000/api/admin




app.get('/',(req,res)=>{
      res.send("api working grea")
})
app.listen(port,()=>console.log("server started", port))