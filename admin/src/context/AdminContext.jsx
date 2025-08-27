
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
   const [atoken, setatoken] = useState(localStorage.getItem("atoken") ? localStorage.getItem('atoken') : '')
   const [doctors, setdoctors] = useState([])
   const[appointments,setappointments]=useState([])
   const[dashdata,setdashdata]=useState(false)
   const backendurl = import.meta.env.VITE_BACKEND_URL
   const getAllDoctors = async () => {
      try {
         const { data } = await axios.post(backendurl + '/api/admin/all-doctors', {}, { headers: { atoken } });
         if (data.success) {
            setdoctors(data.doctors)
            console.log(data.doctors)
         }
         else {
            toast.error(data.message)
         }
      }
      catch (error) {
         toast.error(error.message)
      }
   }
   const changeavialability= async(docId)=>{
                  try{
                     const {data}= await axios.post(backendurl+'/api/admin/change-availability',{docId},{headers:{atoken}})
                       if(data.success){
                        toast.success(data.message)
                        getAllDoctors()
                       }
                       else{
                         toast.error(data.message)
                       }
                  }
                  catch(error){
                     toast.error(error.message)
                  }
   }

   const getallappointments= async()=>{
       try{
          const {data}= await axios.get(backendurl+'/api/admin/appointments', {headers:{atoken}})
            
          if(data.success){
               setappointments(data.appointments)
         
            }
            else{
               toast.error(data.message)
            }
         }
       catch(error){
           toast.error(error.message)
       }
   }
   const cancelappointment=async(appointmentId)=>{
           try{
             const {data}= await axios.post(backendurl+'/api/admin/cancel-appointment',{appointmentId},{headers:{atoken}})
             if(data.success){
            toast.success(data.message)
            getallappointments()

         
            }
            else{
               toast.error(data.message)
            }
            }
            catch(error){
           toast.error(error.message)
       }
           
   }

   const  getdashdata= async()=>{
         try{
             const {data}= await axios.get(backendurl+'/api/admin/dashboard',{headers:{atoken}})
             
             if(data.success){
            setdashdata(data.dashdata)
            }
            else{ 
               toast.error(data.message)
            }
            }
            catch(error){
           toast.error(error.message)
       }
   }

   const value = {
      atoken, setatoken, backendurl, doctors, getAllDoctors,changeavialability,appointments,setappointments,getallappointments,cancelappointment,getdashdata,dashdata
   }



   return (
      <AdminContext.Provider value={value}>
         {props.children}
      </AdminContext.Provider>
   )
}

export default AdminContextProvider