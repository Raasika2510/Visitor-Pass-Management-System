// src/controllers/adminLoginController.js
import { getDb } from "../config/dbconnection.js";

export async function adminLogin(req, res) {
  const { username, password } = req.body;
  console.log("🟡 Controller: Received ->", username, password); // ADD THIS

  try {
    let db = getDb();
    const user = await db.collection("admin_credentials").findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid Credentials. Try again!" });
    }

    console.log("✅ Admin Login Verified");
    return res.status(200).json({
      message: "Login Successful!",
      admin_id: user._id,
    });
  } catch (error) {
    console.error("❌ Controller Error:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
