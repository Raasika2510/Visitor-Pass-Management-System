// AdminAddUser.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddSecurityForm from './AddSecurityForm';
import EditSecurityForm from './EditSecurityForm';

const AdminAddUser = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/adminuser');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/adminuser/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdateSuccess = () => {
    setEditUser(null);
    fetchUsers();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-violet-800 text-center">Manage Security Users</h2>

      {editUser ? (
        <EditSecurityForm user={editUser} onCancel={() => setEditUser(null)} onUpdate={handleUpdateSuccess} />
      ) : (
        <AddSecurityForm onAdd={fetchUsers} />
      )}

      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold text-violet-700 mb-4">Current Users</h3>
        <ul className="divide-y divide-gray-200">
          {users.map(user => (
            <li key={user._id} className="flex justify-between items-center py-4">
              <div>
                <p className="font-semibold text-gray-800">{user.name} <span className="text-sm text-gray-500">({user.username})</span></p>
                <p className="text-sm text-gray-600">
                  Status: <span className={`font-medium ${user.currentStatus === 'active' ? 'text-green-600' : 'text-red-500'}`}>{user.currentStatus}</span>, 
                  Passes Issued: {user.totalPassesIssued}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-500 text-white rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAddUser;
