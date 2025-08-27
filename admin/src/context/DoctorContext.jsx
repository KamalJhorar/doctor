
import { useState } from "react";
import { createContext } from "react";
import  {toast} from 'react-toastify'
import axios from 'axios'

export const DoctorContext= createContext()

const DoctorContextProvider= (props)=>{
     const backendurl= import.meta.env.VITE_BACKEND_URL
      const [profiledata,setprofiledata]=useState(false)
     const [dtoken,setdtoken]= useState(localStorage.getItem("dtoken") ? localStorage.getItem('dtoken') : '')
    const [appointment,setappointment]= useState([])
   const[dashdata,setdashdata]=useState(false)
    const getallappointments=async()=>{
        try{
            const {data}= await axios.get(backendurl+'/api/doctor/appointments',{headers:{dtoken}})
            if(data.success){
               setappointment(data.appointments)
               
            }
            else{
               toast.error(data.message)
            }
         }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    const completeappointment= async(appointmentId)=>{
        try{
            const {data}= await axios.post(backendurl+'/api/doctor/complete-appointments',{appointmentId},{headers:{dtoken}})
            if(data.success){
               toast.success(data.message)
               getallappointments()
            }
            else{
               toast.error(data.message)
            }
            
        }
         catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

     const cancelappointment= async(appointmentId)=>{
        try{
            const {data}= await axios.post(backendurl+'/api/doctor/cancel-appointments',{appointmentId},{headers:{dtoken}})
            if(data.success){
               toast.success(data.message)
               getallappointments()
            }
            else{
               toast.error(data.message)
            }
            
        }
         catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const getdashdata= async()=>{
      try{
           const {data}= await axios.get(backendurl+'/api/doctor/dashboard',{headers:{dtoken}})
           if(data.success){
            setdashdata(data.dashdata)
            
           }
           else{
            toast.error(data.message)
           }
   
          }
       catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const getprofiledata= async()=>{
      try{
           const {data}= await axios.get(backendurl+'/api/doctor/profile',{headers:{dtoken}})
           if(data.success){
            setprofiledata(data.profiledata)
           }
           else{
            toast.error(data.message)
           }
   
          }
       catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
     




       const value={
          dtoken,setdtoken,backendurl,getallappointments,appointment,setappointment,
          completeappointment,cancelappointment,getdashdata,dashdata,setdashdata,
          profiledata,setprofiledata,getprofiledata,
       }
       return (
        <DoctorContext.Provider value={value}>
           {props.children} 
        </DoctorContext.Provider>
       )
}

export default DoctorContextProvider