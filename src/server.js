import dotenv from "dotenv"
dotenv.config();
import app from "./app.js";
import ConnectDB from "./config/db.js";
ConnectDB();
app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})
