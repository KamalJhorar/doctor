import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
          {/* first left */}
          <div>
           <img className='mb-5 w-40' src={assets.logo} alt="" />
           <p className='w-full md:w-2/3 text-gray-600 leading-6'>Book your appointments with ease and connect with trusted doctors anytime, anywhere. We make healthcare accessible, reliable, and hassle-free so you can focus on what matters most — your health.
           </p>
          </div>

          {/* second */}
          <div>
             <p className='text-xl font-medium mb-5'>COMPANY</p>
             <ul className='flex flex-col gap-2 text-gray-600 '> 
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
             </ul>
          </div>
          {/* last */}
           <div>
             <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
             <ul className='flex flex-col gap-2 text-gray-600 mb-10 '>
                <li>+91-9875821128</li>
                <li>prescripto@gmail.com</li>
             </ul>
              <a className=' text-gray-600 ' href="https://doctor-appointment-a.onrender.com">Doctor Dashboard</a>
           </div>
        </div> 
        {/* copyright text */}
        <div>
            <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ Prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
