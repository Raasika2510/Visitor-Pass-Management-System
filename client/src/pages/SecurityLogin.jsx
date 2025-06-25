import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SecurityLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:5000/api/security/login',{
        username,password
      })
      localStorage.setItem('security_id',res.data.security_id);
      console.log("Login Successful!")
      navigate('/security/dashboard');
    }catch(error){
      console.log(error);
      setMessage(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="bg-violet-400 shadow-xl rounded-2xl p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Gate Sign In</h2>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username:
          </label>
          <input
            type="username"
            id="username"
            value = {username}
            onChange = {(e)=>{setUsername(e.target.value)}}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Username"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value = {password}
            placeholder="Enter your Password"
            onChange = {(e)=>{setPassword(e.target.value)}}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {message && <p className="text-center text-2xl text-red-800 mb-3">{message}</p>}
        <button
          type="submit"
          className="text-white bg-violet-800  hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default SecurityLogin