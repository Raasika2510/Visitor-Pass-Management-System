console.log("🔥 server.js starting...");

import express from "express";
import { connectDB } from "./config/dbconnection.js";
import securityLoginRoute from "./routes/securityLoginRoute.js";
console.log("📁 securityLoginRoute.js loaded");
import adminLoginRoute from "./routes/adminLoginRoute.js";
console.log("📁 adminLoginRoute.js loaded");
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/security", securityLoginRoute);
app.use("/api/admin", adminLoginRoute);
console.log("✅ Routes registered");

connectDB().then(() => {
  console.log("✅ DB Connected");
  app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
});
