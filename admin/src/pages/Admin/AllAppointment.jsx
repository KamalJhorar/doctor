import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const AllAppointment = () => {
    
   const {atoken, appointments,getallappointments,cancelappointment}=useContext(AdminContext)
   const{calculateAge,currency}= useContext(AppContext)
  useEffect(()=>{
  if(atoken){
    getallappointments()
    
  }
  },[atoken])

   const months = ['',"Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   
   
    const slotDateformat =(slotDate)=>{
        const datearray=slotDate.split('_')
        return datearray[0]+" "+months[Number(datearray[1])]+" "+datearray[2]
    }

   return (
    <div className='w-full max-w-6xl m-5 '>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
     <div className='bg-white border border-gray-300 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll scrollbar-hide'>
      <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300'>
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {appointments.map((item,index)=>(
        <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-400 py-3 px-6 border-b border-gray-300 hover:bg-gray-100' key={index}>
          <p className='max-sm:hidden'>{index+1}</p>
          <div className='flex items-center gap-2'>
            <img className='w-8 rounded-full' src={item.userdata.image} alt="" />
            <p >{item.userdata.name}</p>
          </div>
          <p className='max-s:hidden'>{calculateAge(item.userdata.dob)}</p>
          <p>{slotDateformat(item.slotDate)} ,{item.slottime}</p>
          
            <div className='flex items-center gap-2'>
            <img className='w-8 rounded-full bg-gray-200' src={item.docdata.image} alt="" />
            <p >{item.docdata.name}</p>
          </div>

          <p>{currency}{item.amount}</p>
          {item.cancelled 
          ?<p className='text-red-400 text-xs font-medium'>Cancelled</p>
          : item.iscompleted
          ? <p className='text-green-500 text-xs font-medium'> Completed</p>
          :<img onClick={()=>cancelappointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />

          }
          
          
          </div>
      ))}

     </div>
    </div>
  )
}

export default AllAppointment