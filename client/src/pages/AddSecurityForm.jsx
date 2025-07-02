import React, { useState } from 'react';
import axios from 'axios';

const AddSecurityForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    currentStatus: 'offline',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/adminuser', formData);
      onAdd();
      setFormData({ name: '', username: '', password: '', currentStatus: 'offline' });
    } catch (error) {
      console.error('Failed to add user', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-violet-800">Add New Security</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full border p-2 rounded" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" className="w-full border p-2 rounded" required />
      <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="active">Active</option>
        <option value="offline">Offline</option>
      </select>
      <button type="submit" className="w-full bg-violet-700 hover:bg-violet-600 text-white py-2 px-4 rounded">Add Security</button>
    </form>
  );
};

export default AddSecurityForm;