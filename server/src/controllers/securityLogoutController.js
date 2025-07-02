import { getDb } from '../config/dbconnection.js';
import { ObjectId } from 'mongodb'


export const logoutSecurity = async (req, res) => {
  try {
    const db = getDb()
    const { security_id, lastActive, currentStatus } = req.body
    console.log(security_id)

    if (!security_id || !lastActive || !currentStatus) {
      return res.status(400).json({ message: 'Missing required fields.' })
    }

    const result = await db.collection('security_credentials').updateOne(
      { _id: security_id } , 
      {
        $set: {
          lastActive: new Date(lastActive),
          currentStatus,
        },
      }
    )

    console.log('✅ Logout update result:', result)
    return res.status(200).json({ message: 'Logout successful!' })
  } catch (error) {
    console.error('❌ Error in logoutSecurity:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
