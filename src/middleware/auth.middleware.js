import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const protect = async (req,res,next) => {
    try {

     let token;
     //1. Get token from cookies
     if(req.cookies.token){
        token = req.cookies.token;
     }   
    //2. If no token 
     if(!token){
        return res.status(401).json({message:"Not authorized , no token"});
     }
     
     //3. Verify token
     const decoded = jwt.verify(token,process.env.JWT_SECRET);
     //4. Get user from DB 
     const user = await userModel.findById(decoded.id).select("-password");

     if(!user){
        return res.status(401).json({
            message:"User not found",
        })
     }
     //5. Attach to user request
     req.user = user;

     next();//move to next middleware/controller
      
    } catch (error) {
     console.error("Auth error:",error);
     res.status(401).json({
        message:"Not authorized, token failed",
     });   
    }
}