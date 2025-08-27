import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const currencysymbol = '$'
  const backendurl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setdoctors] = useState([])
const [token, settoken] = useState(localStorage.getItem("token") || "")
  const [userdata, setuserdata] = useState({})


  const getAllDoctordata = async () => {
    try {
      const { data } = await axios.get(backendurl + '/api/doctor/list')
      if (data.success) {
        setdoctors(data.doctors)

      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }
  const loaduserprofiledata = async () => {
    try {
      const { data } = await axios.get(backendurl + '/api/user/get-profile', { headers: { token } })
      if (data.success) {
        setuserdata(data.userdata)
        
        
      } else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAllDoctordata()
  }, [])

  useEffect(() => {
    if (token) {
      loaduserprofiledata()
    }
    else {
      setuserdata({})
    }
  }, [token])

  const value = {
    doctors,getAllDoctordata,
    currencysymbol, settoken, token, backendurl, userdata, setuserdata, loaduserprofiledata,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}
export default AppContextProvider;