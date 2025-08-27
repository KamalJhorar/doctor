import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]'  src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 '>
          <p>We make healthcare simple by helping you find and book trusted doctors with ease. Our platform connects patients with experienced specialists across various fields, ensuring quick, reliable, and hassle-free appointments anytime, anywhere.</p>
          <p>Our goal is to make quality healthcare accessible to everyone. With just a few clicks, you can browse verified doctors, view their profiles, and book appointments conveniently from the comfort of your home.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>To make healthcare easy, accessible, and trustworthy for everyone by connecting patients with the right doctors at the right time.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US </span></p>
      </div>

      <div className='flex flex-col md:flex-row -mb-10 gap-5'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer' >
          <b>Efficiency:</b>
          <p>To bring efficiency into healthcare by simplifying doctor appointments and ensuring quick, seamless access to trusted medical care.</p>
          </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience</b>
          <p>We aim to create a trusted digital platform where patients can easily connect with qualified doctors,</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>presonlistion</b>
          <p>By connecting patients with qualified doctors across multiple specialties, we aim to reduce waiting times, improve the booking experience.</p>
        </div>
      </div>


    </div>
  )
}

export default About