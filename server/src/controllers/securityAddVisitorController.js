import { getDb } from "../config/dbconnection.js";

export const addVisitor = async (req, res) => {
    try {
        const db = getDb();
        
        const { visitor_id, name, mobile, email, address, vehicleNo, personToMeet, department, purpose, security_id, entryTime } = req.body;
        if (!visitor_id || !security_id || !name || !entryTime) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        
        const visitorEntry = {
            visitor_id,
            entryTime: new Date(entryTime),
            security_id,
            name,
            mobile,
            email,
            address,
            vehicleNo,
            personToMeet,
            department,
            purpose,
            status: "IN" 
        };

        await db.collection("visitor_entries").insertOne(visitorEntry);

        await db.collection("security_activity_logs").insertOne({
            visitor_id,
            security_id,
            action: "entry",
            timestamp: new Date(entryTime)
        });

        res.status(201).json({ message: "Visitor data saved successfully." });
    } catch (error) {
        console.error("Error saving visitor:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}