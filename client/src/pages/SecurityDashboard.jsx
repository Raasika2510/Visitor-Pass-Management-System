import React, { useEffect, useState } from 'react'
import axios from 'axios'
import image from '../assets/image.png'

function SecurityDashboard() {
  const [visitors, setVisitors] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    inCampus: 0,
    outCampus: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/securitydashboard/read')
        const visitors = res.data.visitors || []

        const total = visitors.length
        const inCampus = visitors.filter(v => v.status === 'IN').length
        const outCampus = total - inCampus

        setVisitors(visitors)
        setStats({ total, inCampus, outCampus })

      } catch (err) {
        console.error('Error fetching visitor data', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Section - Stats & Visitor List */}
      <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-violet-800 mb-2">TODAY'S VISITOR STATS</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-violet-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-violet-800">Total Visitors</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-green-800">In Campus</h3>
            <p className="text-2xl font-bold">{stats.inCampus}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-red-800">Left Campus</h3>
            <p className="text-2xl font-bold">{stats.outCampus}</p>
          </div>
        </div>

        {/* Visitor List */}
        <div className="mt-4 max-h-[400px] overflow-y-auto">
          <h2 className="text-xl font-semibold text-violet-800 mb-2">LIST OF VISITORS</h2>
          {visitors.map((v, index) => (
            <div
              key={index}
              className={`flex justify-between items-center border p-3 rounded-md mb-2 ${v.status === 'IN' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                }`}
            >
              <div>
                <p className="font-semibold">{v.name}</p>
                <p className="text-sm text-gray-600">{v.department}</p>
              </div>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${v.status === 'IN'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  }`}
              >
                {v.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - College Photo */}
      <div className="w-full md:w-96 flex-shrink-0 h-full">
        <img
          src={image}
          alt="College"
          className="rounded-xl shadow-lg object-cover h-full w-full"
        />
      </div>
    </div>
  )
}

export default SecurityDashboard
