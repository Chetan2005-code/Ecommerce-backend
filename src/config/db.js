import mongoose from "mongoose";
async function ConnectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB")
    } catch (error) {
        console.log("Database Connection error:",error)
        process.exit(1);
    }
}

export default ConnectDB;