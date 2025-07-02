import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSecurityForm = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    currentStatus: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        password: user.password || '',
        currentStatus: user.currentStatus || 'offline',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/adminuser/${user._id}`, formData);
      onUpdate();
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-violet-800">Edit Security User</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full border p-2 rounded" required />
      <div className="relative">
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          className="w-full border p-2 rounded pr-12"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-violet-700 hover:underline"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="active">Active</option>
        <option value="offline">Offline</option>
      </select>
      <div className="flex gap-4">
        <button type="submit" className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded">Update</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default EditSecurityForm;