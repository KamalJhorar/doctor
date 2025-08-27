import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const Doctrappointment = () => {
    const { dtoken, appointment, getallappointments, completeappointment, cancelappointment } = useContext(DoctorContext)
    const { calculateAge, currency } = useContext(AppContext)
    useEffect(() => {
        if (dtoken) {
            getallappointments()
        }
    }, [dtoken])

    const months = ['', "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const slotDateformat = (slotDate) => {
        const datearray = slotDate.split('_')
        return datearray[0] + " " + months[Number(datearray[1])] + " " + datearray[2]
    }
    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
            <div className='bg-white border border-gray-200 rounded max-h-[80vh] min-h-[50vh] overflow-y-scroll scrollbar-hide'>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border -b border-gray-200'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>
                {
                    appointment.reverse().map((item, index) => (
                        <div className='flex flex-wrap justify-between max:sm:gap-5 max:sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b  border-gray-200 hover:bg-gray-100 ' key={index}>
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 rounded-full' src={item.userdata.image} alt="" />
                                <p >{item.userdata.name}</p>
                            </div>
                            <div>
                                <p className='text-xs inline border border-primary px-2 rounded-full  '>{item.payment ? 'Online' : 'Cash'}</p>
                            </div>
                            <p className='max-sm:hidden'>{calculateAge(item.userdata.dob)}</p>
                            <p>{slotDateformat(item.slotDate)},{item.slottime}</p>
                            <p>{currency}{item.amount}</p>
                            {item.cancelled
                                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                : item.iscompleted
                                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                                    : <div className='flex'>
                                        <img onClick={() => cancelappointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                         <img onClick={() => completeappointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                    </div>}

                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Doctrappointment