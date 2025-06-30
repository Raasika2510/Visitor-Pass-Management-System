console.log("🔥 server.js starting...");

import express from "express";
import { connectDB } from "./config/dbconnection.js";
import securityLoginRoute from "./routes/securityLoginRoute.js";
import adminLoginRoute from "./routes/adminLoginRoute.js";
import securityAddVisitorRoute from "./routes/securityAddVisitorRoute.js"
import securityExitVisitorRoute from "./routes/securityExitVisitorRoute.js"
import securityDashboardRoute from "./routes/securityDashboardRoute.js"
import mainVisitorScanRoute from './routes/mainVisitorScanRoute.js'
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/security", securityLoginRoute);
app.use("/api/admin", adminLoginRoute);
app.use("/api/securityaddvisitor",securityAddVisitorRoute);
app.use("/api/securityexitvisitor",securityExitVisitorRoute);
app.use("/api/securitydashboard",securityDashboardRoute)
app.use("/api/scanpage", mainVisitorScanRoute);

connectDB().then(() => {
  console.log("✅ DB Connected");
  app.listen(5000, () => console.log("Server running at http://localhost:5000"));
});
