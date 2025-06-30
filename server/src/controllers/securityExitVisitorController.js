import { getDb } from "../config/dbconnection.js";

export const exitVisitor = async (req, res) => {
  try {
    const db = getDb();
    const { visitor_id, exitTime } = req.body;

    if (!visitor_id) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const result = await db.collection('visitor_entries').updateOne(
      { visitor_id: visitor_id },
      {
        $set: {
          status: 'OUT',
          exitTime: new Date(exitTime),
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Visitor not found." });
    }

    return res.status(200).json({ message: "Log out Successful!" });

  } catch (error) {
    console.error("❌ Error in exitVisitor:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
