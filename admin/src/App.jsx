import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import Doctorlist from './pages/Admin/Doctorlist';
import { DoctorContext } from './context/DoctorContext';
import Doctordashboard from './pages/Doctor/Doctordashboard';
import Doctorprofile from './pages/Doctor/Doctorprofile';
import Doctrappointment from './pages/Doctor/Doctrappointment';

const App = () => {

const {atoken}= useContext(AdminContext)
const {dtoken}= useContext(DoctorContext)



  return atoken|| dtoken ? (
    <div className='bg-[#F2F3FF]'>  
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* --------admin path--------------- */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointment' element={<AllAppointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<Doctorlist/>}/>
          
         {/* ---------doctor path----------- */}
          <Route path='/doctor-dashboard' element={<Doctordashboard/>}/>
          <Route path='/doctor-profile' element={<Doctorprofile/>}/>
          <Route path='/doctor-appointment' element={<Doctrappointment/>}/>
             
        </Routes>
      </div>

    </div>
  ):(
    <>
      <Login/> 
      <ToastContainer/>

    </>
  )
}

export default App