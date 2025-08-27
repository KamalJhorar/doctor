import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = () => {
   const [state, setstate]= useState('Sign Up')
  const navigate =useNavigate()
   const {backendurl,token,settoken}=useContext(AppContext)

 
   const [email,setemail]= useState('')
  const [password, setpassword]= useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [name,setname]= useState('')

  const onSubmitHandler= async(event)=>{
      event.preventDefault()
    try{
      if(state==='Sign Up'){
        const {data}=await axios.post(backendurl+'/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          settoken(data.token) 
        }
        else{
          toast.error(data.message)
        }
      }
      else{
         const {data}=await axios.post(backendurl+'/api/user/login',{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          settoken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
    }
    catch(error){
         toast.error(error.message)
    }
  }
  useEffect(()=>{
     if(token){
       navigate('/')
     }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg  '>
        <p className='text-2xl font-semibold '>{state==='Sign Up'? "Create Account":"Login"}</p>
        <p>Please {state==='Sign Up'? "Sign Up":"Sign In"}  to book appoitment</p>
        {
          state==="Sign Up"&& <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 ' type="text" onChange={(e)=>setname(e.target.value)} value={name} required />
        </div>
        }
        
          <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 ' type="email" onChange={(e)=>setemail(e.target.value)} value={email} required />
        </div>
          <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 ' type="password" onChange={(e)=>setpassword(e.target.value)} value={password}required />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>{state==='Sign Up'? "Create Account":"Login"} </button>
          {
            state==="Sign Up"?
            <p> Already have an account? <span onClick={()=>setstate('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            :  <p>Create an new account? <span  onClick={()=>setstate('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
          }
      </div>

    </form>
  )
}

export default Login