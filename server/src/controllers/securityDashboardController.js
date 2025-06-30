import { getDb } from "../config/dbconnection.js";

export const getTodayVisitors = async (req, res) => {
  try {
    const db = getDb();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const visitors = await db.collection("visitor_entries")
      .find({ entryTime: { $gte: startOfDay, $lte: endOfDay } })
      .sort({ entryTime: -1 })
      .toArray();

    const total = visitors.length;
    const inCampus = visitors.filter(v => v.status === "IN").length;
    const outCampus = total - inCampus;

    return res.status(200).json({
      total,
      inCampus,
      outCampus,
      visitors
    });
  } catch (error) {
    console.error("Error in getTodayVisitors:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
