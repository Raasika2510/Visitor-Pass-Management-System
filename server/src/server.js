import express from "express";
import { connectDB } from "./config/dbconnection.js";
import securityLoginRoute from "./routes/securityLoginRoute.js"
import cors from "cors"


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/security',securityLoginRoute);

connectDB().then(()=>{
    app.listen(5000, ()=>{console.log(`Node.js Server Listening at ${5000}`)})
})

