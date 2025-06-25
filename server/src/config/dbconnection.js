import {MongoClient} from "mongodb"; //MongoClient class manages connection pool to Mongo Atlas servers
import dotenv from 'dotenv';

dotenv.config({ path: "../.env" });
const client = new MongoClient(process.env.ATLAS_URL);
let db;

export async function connectDB(){ // Used in the main server.js file to initiate DB Connection
    try{
        await client.connect();//Connects the local client to the given Mongo Server
        db = client.db("GPMSData"); //db is an instantiated object of Class Db that represents the GPMSData Database
        console.log("Mongo Atlas Connection Successful! ")
    }catch(e){
        console.error(`Encountered Error: ${e}`);
    }
}

export function getDb(){ //Used in controllers to perform CRUD With the db object
    return db;
}