import { getDb } from "../config/dbconnection.js";

export async function SecurityLogin(req,res){
    const {username, password} = req.body;
    try{
        const db = getDb();
        const user = await db.collection('security_credentials').findOne({username});
        if(!user || user.password !== password){
            res.status(401).json({message:"Invalid Credentials. Try again!"});
        }

        //To update the last seen and status of the security guard
        await db.collection('security_credentials').updateOne(
            {_id: user._id},
            {$set: {lastActive: new Date(), currentStatus:"online"}}
        )

        //return the success message and id to the frontend
        return res.status(200).json({
            security_id : user._id,
            message: "Login Successful!"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error!"})
    }
}