import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets_admin/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import  axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'
import {useNavigate}from 'react-router-dom'


const Login = () => {
    const [state,setstate]= useState('Admin') 
        const navigate= useNavigate()


    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const {setdtoken}= useContext(DoctorContext)
   const {setatoken,backendurl}= useContext(AdminContext)
     const onSubmitHandler= async(event)=>{
        event.preventDefault()

        try{
          if(state==='Admin'){
                const {data}= await axios.post(backendurl+'/api/admin/login',{email,password})
                if(data.success){
                   localStorage.setItem("atoken", data.token)
                    setatoken(data.token)
                      toast.success("Login successful!")
                      navigate('/admin-dashboard')
                   
                }
                else{
                    toast.error(data.message)
                }
          }
          else{
                const {data}= await axios.post(backendurl+'/api/doctor/login',{email,password})
                    if(data.success){
                   localStorage.setItem("dtoken", data.token)
                    setdtoken(data.token)
                    console.log(data.token)
                      toast.success("Login successful!")
                      navigate('/doctor-dashboard')

                }
                else{
                    toast.error(data.message)
                }
          }
         }
        catch(error){

        }
     }

 
    return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-[#5E5E5E] text-sm shadow-xl   '>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full '>
            <p>Email</p>
            <input onChange={(e)=>setemail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
       {
        state==='Admin'
        ? <p> Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setstate('Doctor')}>Click here</span> </p>
        : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setstate('Admin')}>Click here</span> </p>
       }
        </div>
    </form>
  )
}

export default Login