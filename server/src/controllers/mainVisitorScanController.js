import { getDb } from "../config/dbconnection.js";

export const getVisitorDetails = async (req, res) => {
  try {
    const db = getDb();
    const { visitor_id } = req.body;

    if (!visitor_id) {
      return res.status(400).json({ message: "Visitor ID not passed!" });
    }

    const visitor = await db.collection('visitor_entries').findOne({ visitor_id });

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    return res.status(200).json(visitor);
  } catch (error) {
    console.log("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
