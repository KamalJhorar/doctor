import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import Relateddoc from '../components/Relateddoc'
import { toast } from 'react-toastify'
import axios from 'axios'

// 🔹 Standalone function for fetching doctor info
function getDoctorInfo(doctors, docId) {
  if (!doctors || doctors.length === 0 || !docId) return null
  return doctors.find(doc => String(doc._id) === String(docId)) || null
}

const Myappointment = () => {
  const dayofweek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const { docId } = useParams()
  const { doctors,currencysymbol,backendurl,token, getAllDoctordata } = useContext(AppContext)
  
     const navigate= useNavigate()

  const [docInfo, setDocInfo] = useState(null)
   const [docslot,setdocslot]=useState([])
   const [slotindex,setslotindex]= useState(0)
   const [slottime,setslottime]= useState('')


  useEffect(() => {
    const info = getDoctorInfo(doctors, docId)
    setDocInfo(info)
    // console.log("Doctor found:", info)
  }, [doctors, docId])

  const getavialableslot= async()=>{
        setdocslot([]) 
        //getting current date
        let today= new Date()
        for(let i=0;i<7;i++){
          // getting date with index
          let currentdate= new Date(today)
          currentdate.setDate(today.getDate()+i)
          // setting end time of date
          let endtime= new Date()
          endtime.setDate(today.getDate()+i)
          endtime.setHours(21,0,0,0)

          //setting hours
          if(today.getDate()===currentdate.getDate()){
             currentdate.setHours(currentdate.getHours()>10 ? currentdate.getHours()+1 :10)
             currentdate.setMinutes(currentdate.getMinutes()>30 ? 30:0)
          }else{
            currentdate.setHours(10)
            currentdate.setMinutes(0)
          }
          let timeslots= []
          while(currentdate<endtime){
                let formattedtime= currentdate.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'})
                let day= currentdate.getDate()
                let month= currentdate.getMonth()+1
                let year= currentdate.getFullYear()

                const slotDate= day+"_"+month+"_"+year
                const slottime= formattedtime

                const isslotavailable= docInfo.slots_booked[slotDate]&&docInfo.slots_booked[slotDate].includes(slottime)?false:true
                
                if(isslotavailable){
  timeslots.push({
                datetime:new Date(currentdate),
               time: formattedtime

              })
                }

                // add slot to array 
          
              currentdate.setMinutes(currentdate.getMinutes()+30)
              }
              setdocslot(prev=>([...prev,timeslots]))
        }
  }
 
  const bookappointment= async()=>{
      if(!token){
        toast.warn('Login to Book Appointment')
        return navigate('/login')
      }
       if (!slottime) {
    toast.error('Please select a time slot before booking.');
    return; 
  }
    
      try{
          const date= docslot[slotindex][0].datetime
          let day= date.getDate()
          let month= date.getMonth()+1
          let year =date.getFullYear()

          const slotDate= day+"_"+month+"_"+year
           
          const {data}= await axios.post(backendurl+'/api/user/book-appointment',{docId,slotDate,slottime}, {headers:{token}})
         if(data.success){
          toast.success(data.message)
          getAllDoctordata()
          navigate('/appointment')
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




  useEffect(()=>{
      if (docInfo) {
      getavialableslot()
    }
  },[docInfo])


  useEffect(()=>{
  //  console.log(docslot)
  },[docslot])

  // Guard: avoid crash
  if (!docInfo) {
    return <p className="text-center mt-10 text-gray-500">Loading doctor info...</p>
  }



  return (
      <div>
        {/*  ----------doctor info---------- */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0  '>
            {/* -------doc info name degree exp----------- */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 '>
              <p>{docInfo.degree}-{docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full '>{docInfo.experience}</button>
            </div>
            {/* ------doctor about---------- */}
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3' >About <img src={assets.info_icon} alt="" /></p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
             <p className='text-gray-500 font-medium mt-4'> Appointment fee: <span className='text-gray-600'>{currencysymbol}{docInfo.fees}</span></p>

          </div>
        </div>
    {/* booking slots */}
       
       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
         <p>Booking Slots</p>
         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 scrollbar-hide'>
          {
            docslot.length && docslot.map((item,index)=>(
                   <div onClick={()=>setslotindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex===index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                    <p>{item[0]&& dayofweek[item[0].datetime.getDay()]}</p>
                    <p> {item[0]&& item[0].datetime.getDate()}</p>
                    </div>
            ))
          }
         </div>
         {/* booking time */}
         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 scrollbar-hide  '>
          {docslot.length && docslot[slotindex].map((item,index)=>(
                  <p onClick={()=>setslottime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slottime ? 'bg-primary text-white' :  'text-gray-400 border border-gray-300'} `} key={index}>
                    {item.time.toLowerCase()}
                    </p>
          ))}
         </div>
         <button onClick={bookappointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6  cursor-pointer ' >Book an Appointment</button>

       </div>

       {/* related doctor  */}

       <Relateddoc docId={docId} speciality={docInfo.speciality}/>



      </div>
  
  )
}

export default Myappointment
