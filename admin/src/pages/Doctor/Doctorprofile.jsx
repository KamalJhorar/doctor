import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { profiledata, setprofiledata, getprofiledata, dtoken, backendurl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isedit, setisedit] = useState(false)

  const updateprofile = async () => {
    try {
      const { data } = await axios.post(
        backendurl + '/api/doctor/update-profile',
        {
          fees: profiledata.fees,
          address: profiledata.address,
          avialable: profiledata.avialable,
        },
        { headers: { dtoken } }
      )

      if (data.success) {
        toast.success(data.message)
        setisedit(false)
        getprofiledata()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dtoken) {
      getprofiledata()
    }
  }, [dtoken])

  if (!profiledata) return null

  return (
    <div>
      <div className="flex flex-col gap-5 m-5">
        <div>
          <img
            className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
            src={profiledata.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          {/* ---------doc info --------- */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profiledata.name}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-500">
            <p>
              {profiledata.degree} - {profiledata.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {profiledata.experience}
            </button>
          </div>

          {/* -------doc about------------ */}
          <div>
            <p className="flex items-center gap-1 text-xs font-medium text-neutral-800">
              About:
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1 ">
              {profiledata.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment Fees:
            <span className="text-gray-800">
              {currency}
              {isedit ? (
                <input
                  type="number"
                  className="border rounded px-2 ml-2 w-24"
                  onChange={(e) =>
                    setprofiledata((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profiledata.fees}
                />
              ) : (
                profiledata.fees
              )}
            </span>
          </p>

          <div className="flex gap-2 py-2 ">
            <p className="text-gray-800">Address:</p>
            <p className="text-sm text-gray-600">
              {isedit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setprofiledata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profiledata.address.line1}
                />
              ) : (
                profiledata.address.line1
              )}
              <br />
              {isedit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setprofiledata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profiledata.address.line2}
                />
              ) : (
                profiledata.address.line2
              )}
            </p>
          </div>

          <div className="flex gap-1 pt-2 ">
            <input
              type="checkbox"
              checked={profiledata.avialable}
              onChange={() =>
                isedit &&
                setprofiledata((prev) => ({
                  ...prev,
                  avialable: !prev.avialable,
                }))
              }
            />
            <label>Available</label>
          </div>

          {isedit ? (
            <button
              onClick={updateprofile}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 cursor-pointer hover:bg-primary hover:text-white"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                setisedit(true)
              }}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 cursor-pointer hover:bg-primary hover:text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
