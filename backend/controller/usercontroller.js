import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import{v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentmodel.js'
import Razorpay from "razorpay";

// api to register user
const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'missing details' })
        }
        // validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'enter a valid email' })
        }
        // validating passsword
        if (password.length < 8) {
            return res.json({ success: false, message: "please enter strong password" })
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userdata = {
            name,
            email,
            password: hashedPassword,
        }

        const newuser = new userModel(userdata)
        const user = await newuser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Api for user login

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User does not  exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "password donot match" })
        }


    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api for user profile data

const getprofile = async (req, res) => {
    try {
        const userId  = req.user
        
        const userdata = await userModel.findById(userId).select('-password')
        res.json({ success: true, userdata })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// update user profile
const updateprofile = async (req, res) => {
    try {
        const userId = req.user
          const { name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        console.log(req.body)
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: 'data missing' })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
       if(imageFile){
       // upload image to cloudinary
       const imageupload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'}) 
       const imageurl= imageupload.secure_url
       await userModel.findByIdAndUpdate(userId,{image:imageurl})
       }
       res.json({success:true,message:"profile Updated"})
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to book appintment

const bookAppointment= async(req,res)=>{
    try{
         const userId= req.user
       const{docId,slotDate,slottime}= req.body
        
        if (!docId || !slotDate || !slottime) {
      return res.json({success: false, message: "Missing required booking details."});
    }
       
       const docdata= await doctorModel.findById(docId).select('-password')

        
      if(!docdata.avialable) {
         return res.json({success:false,message:"doctor not available"})
      }
       let slots_booked= docdata.slots_booked
       
       // check for slot availablity
       if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slottime)){
         return res.json({success:false,message:"slot not available"})    
        }
        else{
            slots_booked[slotDate].push(slottime)
        }
       }
       else{
        slots_booked[slotDate]=[]
        slots_booked[slotDate].push(slottime)
       }

       const userdata= await userModel.findById(userId).select('-password')
       delete docdata.slots_booked
    
       const appintmentdata={
        userId,
        docId,
        userdata,
        docdata,
        amount:docdata.fees,
        slottime,
        slotDate,
        date:Date.now()
       }

       const newappointment = new appointmentModel(appintmentdata)
        await newappointment.save()

        // save new slot data in doc data

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"Appointment booked successfully"})
    
    
    } 
    catch(error){
         console.log(error)
         res.json({success:false,message:error.message})
    }
}


// api to get user appointments 

const listappointment= async(req,res)=>{
    try{
        const userId= req.user
        const appointments= await appointmentModel.find({userId})

        res.json({success:true,appointments})

    }
    catch(error){
            console.log(error)
         res.json({success:false,message:error.message})
    }

}


// api to cancel appointment

const cancelappointment= async(req,res)=>{
     try{
           const userId= req.user
           const { appointmentId } = req.body
          const appointmentdata = await appointmentModel.findById(appointmentId)

          // verify appointment user
           if (userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized action" })
    }

           await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

           // releasing doc slot
           const {docId,slotDate,slottime}= appointmentdata
           const docdata= await doctorModel.findById(docId)
           let slots_booked= docdata.slots_booked

 if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slottime)
    }
           await doctorModel.findByIdAndUpdate(docId, {slots_booked})
           res.json({success:true,message:"Appointment Cancelled"})
     }
       catch(error){
            console.log(error)
         res.json({success:false,message:error.message})
    }
}

//api to make online payment
 const razorpayinstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
 })
const paymentrazorpay = async(req,res)=>{
     
    try{
    const {appointmentId}= req.body
    const appintmentdata= await appointmentModel.findById(appointmentId)
     
    if(!appintmentdata || appintmentdata.cancelled){
        return res.json({success:false,message:"Appointment Cancelled or not found"})
    }
    //creating option payment
     const options={
        amount:appintmentdata.amount*100,
        Currency:process.env.Currency,
        receipt:appointmentId,  
     }
     // creation of order
     const order= await razorpayinstance.orders.create(options)

     res.json({success:true,order})
    }
     catch(error){
            console.log(error)
         res.json({success:false,message:error.message})
    }
}


// api for verify payment

const verifyrazorpay=async(req,res)=>{
    try{
      const{razorpay_order_id}= req.body
      const orderInfo=await razorpayinstance.orders.fetch(razorpay_order_id)
      
      if(orderInfo.status==='paid'){
        await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
       res.json({success:true,message:"Payment Successfull"})
     }
     else{
       res.json({success:false,message:"Payment Failed"})

     }
    }
    catch(error){
            console.log(error)
         res.json({success:false,message:error.message})
    }
}



export { registeruser, loginuser, getprofile,updateprofile,bookAppointment,listappointment,cancelappointment,paymentrazorpay,verifyrazorpay }