import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const contact = () => {

  return (
    <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
        </div>

        <div className='flex my-10 flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
          <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
       <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
        <p className='text-gray-500'>5489 willms station, <br /> suite 350, Bhopal, MP</p>
        <p className='text-gray-500'>Tel: +91 98758-21128 <br />Email: prescripto@gmail.com</p>
        <p className='font-semibold text-lg text-gray-600'>Carrer at PRESCRIPTO</p>
        <p className='text-gray-500'>Learn more about our team and job openings.</p>
        <button className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>Explore Job</button>
       </div>
        </div>

    </div>
  )
}

export default contact