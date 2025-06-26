import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useNavigate } from 'react-router-dom'

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
}

function SecurityAddVisitor() {
  const webcamRef = useRef(null)
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    vehicleNo: '',
    personToMeet: '',
    department: '',
    purpose: '',
  })

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot()
    setImage(screenshot)
  }

  const clearAll = () => {
    setImage(null)
    setFormData({
      name: '',
      mobile: '',
      email: '',
      address: '',
      vehicleNo: '',
      personToMeet: '',
      department: '',
      purpose: '',
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePreview = () => {
    if (!image) return alert("Please capture an image.")
    localStorage.setItem('visitor_data', JSON.stringify({ ...formData, image }))
    navigate('/security/previewpass')
  }

  return (

    <div className="max-w mx-auto mt-5 bg-white shadow-xl p-8 rounded-2xl">

      <h2 className="text-2xl text-center font-bold text-violet-800 mb-6">ADD A NEW VISITOR</h2>
      <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center bg-violet-200 p-5 rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-4 mx-auto">
          <div className="relative w-[300px] h-[300px] rounded-lg shadow border bg-black">
  {!image ? (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="rounded-lg w-full h-full object-cover"
      />
      {/* Red square overlay */}
      <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    </>
  ) : (
    <img
      src={image}
      alt="Captured"
      className="rounded-lg w-full h-full object-cover"
    />
  )}
</div>


          <button
            onClick={capture}
            className="bg-violet-700 hover:bg-violet-600 text-white font-semibold py-2 px-6 rounded shadow"
          >
            {image ? "Retake Photo" : "Capture Photo"}
          </button>
        </div>


        {/* Form controls or additional section */}
        <div className="flex flex-col gap-2 w-full">
          {/* You can add other form control buttons or info here if needed */}
        </div>
      </div>


      {/* Form Fields */}
      <form className="grid grid-cols-1  p-5 rounded-2xl md:grid-cols-2 gap-4">
        {[
          ['name', 'Full Name'],
          ['mobile', 'Mobile Number'],
          ['email', 'Email'],
          ['address', 'Address'],
          ['vehicleNo', 'Vehicle Number'],
          ['personToMeet', 'Person to Meet'],
          ['department', 'Department'],
          ['purpose', 'Purpose of Visit'],
        ].map(([field, label]) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="h-10 mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              required
            />
          </div>
        ))}
      </form>

      {/* Buttons */}
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={clearAll}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
        >
          Clear
        </button>
        <button
          onClick={handlePreview}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Preview Pass
        </button>
      </div>
    </div>
  )
}

export default SecurityAddVisitor
