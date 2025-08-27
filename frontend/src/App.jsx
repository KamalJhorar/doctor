import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Doctors from './pages/doctors';
import Contact from './pages/contact';
import Myappointment from './pages/myappointment';
import Myprofile from './pages/myprofile';
import Login from './pages/login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Appointment from './pages/appointment';
  import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
      <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer/>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/contact' element={<Contact />} />
         <Route path='/myappointment' element={<Myappointment />} />
         <Route path='/appointment' element={<Appointment />} />

        <Route path='/myappointment/:docId' element={<Myappointment />} />
        <Route path='/myprofile' element={<Myprofile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
