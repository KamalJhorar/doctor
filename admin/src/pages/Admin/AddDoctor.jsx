import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

   const [docImg,setDocImg]= useState(false)
   const [name,setname]= useState('')
   const [email,setemail]= useState('')
   const [password,setpassword]= useState('')
   const [experience,setexperience]= useState('1 year')
   const [fees,setfees]= useState('')
   const [about,setabout]= useState('')
   const [speciality,setspeciality]= useState('General physician')
   const [degree,setdegree]= useState('')
   const [adress1,setadress1]= useState('')
   const [adress2,setaddress2]= useState('')

   const {backendurl,atoken}=useContext(AdminContext)


   const onSubmitHandler= async(event)=>{
           event.preventDefault()
           try{
            if(!docImg){
                return toast.error('Image not selected')
            }
            const formdata= new FormData()

            formdata.append('image',docImg)
            formdata.append('name',name)
            formdata.append('email',email)
            formdata.append('password',password)
            formdata.append('experience',experience)
            formdata.append('fees',Number(fees))
            formdata.append('about',about)
            formdata.append('speciality',speciality)
            formdata.append('degree',degree)
            formdata.append('address',JSON.stringify({line1:adress1,line2:adress2}))


            const {data}=await axios.post(backendurl+ '/api/admin/add-doctor',formdata,{headers:{ atoken}})
            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setname('')
                setemail('')
                setpassword('')
                setaddress2('')
                setadress1('')
                setdegree('')
                setabout('')
                setfees('')


            }else{
                toast.error(data.message)
            }
        }
           catch(error){
               toast.error(error.message)
               console.log(error )
           }
   }


    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full' >
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>
            <div className='bg-white px-8 py-8 w-full border rounded max-w-4xl max-h-[80vh] overflow-y-scroll scrollbar-hide'>
                <div className='flex items-center gap-4 mb-8 text-gray-500  '>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-200 rounded-full cursor-pointer' src={docImg ?URL.createObjectURL(docImg) :assets.upload_area} alt="" /> </label>
                    <input onChange={(e)=>setDocImg(e.target.files[0])}  type="file" id="doc-img" hidden />
                    <p>Upload doctor picture</p>
                </div>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor name</p>
                            <input onChange={(e)=>setname(e.target.value)} value={name}  className='border rounded px-3 py-2 border-gray-300' type="text" placeholder='Name ' required />
                        </div>
                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor Email</p>
                            <input  onChange={(e)=>setemail(e.target.value)} value={email} className='border rounded px-3 py-2 border-gray-300' type="email" placeholder='Email ' required />
                        </div>
                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor Password</p>
                            <input  onChange={(e)=>setpassword(e.target.value)} value={password} className='border rounded px-3 py-2 border-gray-300' type="password" placeholder='password ' required />
                        </div>
                        <div className='flex-1 flex-col gap-1'>
                            <p>Experience</p>
                            <select  onChange={(e)=>setexperience(e.target.value)} value={experience} className='border rounded px-3 py-2 border-gray-300' name="" id="">
                                <option value="1 year">1year</option>
                                <option value="2 year">2 year</option>
                                <option value="3 year">3 year</option>
                                <option value="4 year">4 year</option>
                                <option value="5 year">5 year</option>
                                <option value="6 year">6 year</option>
                                <option value="7 year">7 year</option>
                                <option value="8 year">8 year</option>
                                <option value="9 year">9 year</option>
                                <option value="10+ year">10+ year</option>
                            </select>
                        </div>
                        <div className='flex-1 flex-col gap-1'>
                            <p>Fees</p>
                            <input  onChange={(e)=>setfees(e.target.value)} value={fees} className='border rounded px-3 py-2 border-gray-300' type="number" placeholder='fees ' required />
                        </div>

                    </div>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex-col gap-1'>
                            <p>Speaciality</p>
                            <select  onChange={(e)=>setspeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2 border-gray-300' name="" id="">
                                <option value="General physician"> General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                            </select>
                        </div>
                        <div className='flex-1 flex-col gap-1' >
                            <p>Education</p>
                            <input  onChange={(e)=>setdegree(e.target.value)} value={degree} className='border rounded px-3 py-2 border-gray-300' type="text" placeholder='Education ' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input  onChange={(e)=>setadress1(e.target.value)} value={adress1} className='border rounded px-3 py-2 border-gray-300' type="text" placeholder='Address 1' required />
                            <input   onChange={(e)=>setaddress2(e.target.value)} value={adress2} className='border rounded px-3 py-2 border-gray-300' type="text" placeholder='Address 2' required />

                        </div>

                    </div>
                </div>
                <div>
                    <p className='mt-4 mb-2 text-gray-600'>About</p>
                    <textarea  onChange={(e)=>setabout(e.target.value)} value={about} className='w-full px-4 ot-2 border rounded border-gray-300'  name="" id="" placeholder='About doctor' rows={5}></textarea>
                </div>
                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-2xl cursor-pointer hover:bg-gray-200 hover:text-primary '>Add Doctor</button>
            </div>
        </form>
    )
}

export default AddDoctor