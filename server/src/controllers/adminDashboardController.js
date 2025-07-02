// controllers/adminDashboardController.js
import { getDb } from '../config/dbconnection.js';

export const getAllSecurityDetails = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection('security_credentials').find().toArray();
    return res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching security details:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
