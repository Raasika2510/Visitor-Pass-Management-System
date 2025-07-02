import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    reenterPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const adminId = localStorage.getItem('admin_id');

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/adminprofile/${adminId}`);
        setAdmin(res.data);
        setForm({
          name: res.data.name,
          username: res.data.username,
          password: res.data.password,
          reenterPassword: res.data.password
        });
      } catch (err) {
        console.error('Failed to fetch admin profile', err);
      }
    };
    if (adminId) fetchAdmin();
  }, [adminId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (form.password !== form.reenterPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/adminprofile/${adminId}`, {
        name: form.name,
        username: form.username,
        password: form.password
      });
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  if (!admin) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold text-violet-700 mb-4">Admin Profile</h2>

      {editMode ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="username" value={form.username} onChange={handleChange} className="w-full p-2 border rounded" required />

          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              className="w-full p-2 border rounded pr-12"
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

          <div className="relative">
            <input
              name="reenterPassword"
              value={form.reenterPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter Password"
              className="w-full p-2 border rounded pr-12"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">Save</button>
            <button onClick={() => setEditMode(false)} type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Username:</strong> {admin.username}</p>
          <p><strong>Password:</strong> ******</p>
          <p><strong>Created At:</strong> {new Date(admin.createdAt).toLocaleString()}</p>
          <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Edit</button>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
