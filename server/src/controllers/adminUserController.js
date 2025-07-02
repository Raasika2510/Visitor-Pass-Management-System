import { getDb } from '../config/dbconnection.js';
import { ObjectId } from 'mongodb';

// ✅ Get all security users
export const getAllSecurityUsers = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection('security_credentials').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Add a new security user
export const addSecurityUser = async (req, res) => {
  try {
    const db = getDb();
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newUser = {
      name,
      username,
      password,
      totalPassesIssued: 0,
      lastActive: null,
      currentStatus: "offline",
      createdAt: new Date()
    };

    const result = await db.collection('security_credentials').insertOne(newUser);
    res.status(201).json({ message: "User added successfully", id: result.insertedId });
  } catch (error) {
    console.error("❌ Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSecurityUser = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    // These are all the editable fields
    const {
      name,
      username,
      password,
      totalPassesIssued,
      lastActive,
      currentStatus,
      createdAt,
      status
    } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const updateFields = {
      ...(name && { name }),
      ...(username && { username }),
      ...(password && { password }),
      ...(typeof totalPassesIssued === 'number' && { totalPassesIssued }),
      ...(lastActive && { lastActive: new Date(lastActive) }),
      ...(currentStatus && { currentStatus }),
      ...(createdAt && { createdAt: new Date(createdAt) }),
      ...(status && { status })
    };

    const result = await db.collection('security_credentials').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Security user not found.' });
    }

    res.status(200).json({ message: 'Security user updated successfully.' });
  } catch (error) {
    console.error('❌ Error updating security user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ✅ Delete a security user
export const deleteSecurityUser = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    const result = await db.collection('security_credentials').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
