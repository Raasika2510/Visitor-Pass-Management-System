import { getDb } from '../config/dbconnection.js';
import { ObjectId } from 'mongodb';

export const getAdminProfile = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    const admin = await db.collection('admin_credentials').findOne({ _id: new ObjectId(id) });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('❌ Error fetching admin profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const { name, username, password } = req.body;

    const result = await db.collection('admin_credentials').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, username, password } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('❌ Error updating admin profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
