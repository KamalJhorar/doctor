import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentmodel.js"
const changeavialability = async(req,res)=>{
             
    try{
     const {docId}=req.body
     const docdata= await doctorModel.findById(docId)
      await doctorModel.findByIdAndUpdate(docId, {avialable: !docdata.avialable})
      res.json({success:true,message:'Availability changes'})
    }
    catch(error){
       console.log(error)
       res.json({success:false,message:error.message})
    }
}

const doctorList= async(req,res)=>{
    try{
    const doctors= await doctorModel.find({}).select(['-password','-email'])
    res.json({success:true,doctors})
    }
    catch(error){
          console.log(error)
       res.json({success:false,message:error.message})
    }
}

// api for doctor login
  const logindoctor= async(req,res)=>{
        try{
         const {email,password}= req.body
    const doctor= await doctorModel.findOne({email})
    if(!doctor){
        return res.json({success:false,message:"Invalid credentials"})
    }
    const ismatch= await bcrypt.compare(password,doctor.password)
     if(ismatch){
        const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
          res.json({success:true,token})
    }else{
        return res.json({success:false,message:"Invalid credentials"})

    }

    }
    catch(error){
          console.log(error)
       res.json({success:false,message:error.message})
    }
  }


  // api for appointment of doctor
  const appointmentdoctor= async(req,res)=>{
    try{
          const docId= req.doctor
        const appointments=await appointmentModel.find({docId})
        res.json({success:true,appointments})
    }
     catch(error){
          console.log(error)
       res.json({success:false,message:error.message})
    }
  }

  // api to marks appointment completed

  const appointmentcomplete= async(req,res)=>{
    try{
        const docId= req.doctor
        const {appointmentId}= req.body
        const appintmentdata= await appointmentModel.findById(appointmentId)
   if(appintmentdata && appintmentdata.docId===docId){
     await appointmentModel.findByIdAndUpdate(appointmentId,{iscompleted:true})
     return res.json({success:true,message:'Appointment Completed'})
    }
    else{
     return res.json({success:false,message:'Mark Failed'})
        
    }
   
    }
    catch(error){
          console.log(error)
       res.json({success:false,message:error.message})
    }
  }


  // api to cancel appointment for docotr
   const appointmentcancel= async(req,res)=>{
    try{
    
        const docId= req.doctor
        const {appointmentId}= req.body
        const appintmentdata= await appointmentModel.findById(appointmentId)
   if(appintmentdata && appintmentdata.docId===docId){
     await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
     return res.json({success:true,message:'Appointment Cancelled'})
    }
    else{
     return res.json({success:false,message:'Cancellation Failed'})
        
    }
   
    }
    catch(error){
          console.log(error)
       res.json({success:false,message:error.message})
    }
  }


  // api to get dashboard data for doctor
  const doctordashboard = async(req,res)=>{
         try{
             const docId= req.doctor
             const appointments= await appointmentModel.find({docId})
             let earning=0;
             appointments.map((item)=>{
                  if(item.iscompleted || item.payment){
                    earning+= item.amount
             }
         })
       let patients=[]
       appointments.map((item)=>{
              if(!patients.includes(item.userId)){
                patients.push(item.userId)
              }
       })

       const dashdata={
        earning,
        appointments:appointments.length,
        patients:patients.length,
        latestappointments:appointments.reverse().slice(0,5) 
           }
         res.json({success:true,dashdata})
         }
          catch(error){
          console.log(error)
       res.json({success:false,message:error.message})
    }
  }


  //  api to get doctor profile for doctor panel
  const doctorprofile= async(req,res)=>{
    try{
          const docId= req.doctor
          const profiledata= await doctorModel.findById(docId).select('-password')
         res.json({success:true,profiledata})
        }
     catch(error){
          console.log(error)
       res.json({success:false,message:error.message})
    }
  }

  // api to update doctor profile 

  const updatedoctorprofile= async(req,res)=>{
    try{
         const docId= req.doctor
         const{fees,address,avialable}= req.body
         await doctorModel.findByIdAndUpdate(docId,{fees,address,avialable})

         res.json({success:true,message:"Profile Updated"})
    }
     catch(error){
          console.log(error)
       res.json({success:false,message:error.message})
    }
  }

export {changeavialability,doctorList,logindoctor,appointmentdoctor,appointmentcancel,appointmentcomplete,doctordashboard,updatedoctorprofile,doctorprofile}