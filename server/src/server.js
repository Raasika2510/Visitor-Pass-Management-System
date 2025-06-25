import express from "express";
import { connectDB } from "./config/dbconnection.js";


const app = express();
app.use(express.json());

connectDB().then(()=>{
    app.listen(5000, ()=>{console.log(`Node.js Server Listening at ${5000}`)})
})

