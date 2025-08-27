import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const Appointment = () => {
    const { backendurl,token,getAllDoctordata } = useContext(AppContext)

    const [appointments,setappointments]= useState([])
    const months = ['',"Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const navigate = useNavigate()
   
   
    const slotDateformat =(slotDate)=>{
        const datearray=slotDate.split('_')
        return datearray[0]+" "+months[Number(datearray[1])]+" "+datearray[2]
    }
   
    const getuserappointment= async  ()=>{
        try{
           const {data}= await axios.get(backendurl+'/api/user/appointments', {headers:{token}} )
            
          if (data.success) {
             const appointmentsArray = data.appointments || []
           setappointments(appointmentsArray.reverse())
           
           
           }
        }
        catch(error){
             console.log(error)
             toast.error(error.message)
        }
    }

    const cancelappointment= async(appointmentId)=>{
          try{
              const {data}= await axios.post(backendurl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})


              if(data.success){
                toast.success(data.message)
                getuserappointment()
              }else{
                toast.error(data.message)
              }

          }
            catch(error){
             console.log(error)
             toast.error(error.message)
        }
    }

     const initpay= (order)=>{
           const options={
            key:import.meta.env.VITE_RAZORPAY_KEY_ID,
           amount:order.amount,
           currency:order.currency,
           name:'Appointment PAyement',
           description:"Appointment PAyement",
           order_id:order.id,
           receipt:order.receipt,
           handler:async(response)=>{
               console.log(response)
               try{
                 const {data}= await axios.post(backendurl+'/api/user/verify-razorpay',{response},{headers:{token}})
                 if(data.success){
                    getuserappointment()
                    navigate('/appointment')
                 }
                }
               catch(error){
                  console.log(error)
                  toast.error(error.message)
               }

        }
     }
     const rzp= new window.Razorpay(options)
     rzp.open()
    }
    const appointmentrazorpay= async(appointmentId)=>{
            
        try{
           
            const {data}= await axios.post(backendurl+'/api/user/payment-razorpay', {appointmentId},{headers:{token}})
              if(data.success){
                  initpay(data.order)
                toast.success(data.message)
                
              }else{
                toast.error(data.message)
              }
        }
        catch(error){

        }

    }


     useEffect(()=>{
        if(token){
            getuserappointment()
            getAllDoctordata()
        }
     },[token])

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Application</p>
            <div>
                {appointments.map((item, index) => (
                    <div
                        className='grid grid-cols-[1fr_2fr]  gap-4 sm:flex sm:gap-6 py-2 border-b'
                        key={index}
                    >
                        {/* Image */}
                        <div>
                            <img className='w-32 bg-indigo-50' src={item.docdata.image} alt={item.name} />
                        </div>

                        {/* Text */}
                        <div className='flex-1 text-sm text-zinc-700'>
                            <p className='text-neutral-800 font-semibold'>{item.docdata.name}</p>
                            <p>{item.docdata.speciality}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                            <p className='text-xs'>{item.docdata.address.line1}</p>
                            <p className='text-xs'>{item.docdata.address.line2}</p>
                            <p className='text-xs mt-1'>
                                <span className='text-sm text-neutral-700 font-medium'>Date & Time</span> {slotDateformat(item.slotDate)} | {item.slottime}
                            </p>
                        </div>
                        <div></div>

                        {/* Buttons */}
                        <div className='flex flex-col gap-2 justify-end'>
                            {!item.cancelled && item.payment &&!item.iscompleted  && <button className='sm:min-w-48 py-2 vorder rounded text-stone-500 bg-indigo-100'>Paid</button>}
                           {!item.cancelled &&!item.payment && !item.iscompleted   &&<button onClick={()=>{appointmentrazorpay(item._id)}} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
                                Pay Online
                            </button>} 
                           {!item.cancelled && !item.iscompleted &&<button onClick={()=>cancelappointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer'>
                                Cancel Appointment
                            </button>} 
                            
                            {item.cancelled && !item.iscompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                            {item.iscompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'> Completed </button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Appointment
