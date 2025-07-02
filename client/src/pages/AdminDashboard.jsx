import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserShield } from 'react-icons/fa';

const AdminDashboard = () => {
  const [securityUsers, setSecurityUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admindashboard');
        setSecurityUsers(res.data);
      } catch (err) {
        console.error('Error fetching security users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-violet-800 mb-6">Registered Security Personnel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {securityUsers.map((user) => (
          <div key={user._id} className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-violet-700">{user.name}</h2>
              <span
                className={`h-3 w-3 rounded-full ${
                  user.currentStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}
                title={user.currentStatus}
              ></span>
            </div>
            <p className="text-sm text-gray-600"><strong>Username:</strong> {user.username}</p>
            <p className="text-sm text-gray-600"><strong>Status:</strong> {user.currentStatus}</p>
            <p className="text-sm text-gray-600"><strong>Total Passes:</strong> {user.totalPassesIssued || 0}</p>
            <p className="text-sm text-gray-600"><strong>Last Active:</strong> {new Date(user.lastActive).toLocaleString()}</p>

            <div className="mt-4 flex items-center gap-2 text-violet-700">
              <FaUserShield />
              <span className="text-sm font-medium">Security ID: {user._id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
