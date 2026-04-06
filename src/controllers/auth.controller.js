import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generatetoken.js";
import { comparePassword } from "../utils/hashPassword.js";

async function registerUser(req,res){
    const {name,email,password} = req.body
      try {
           // 1. Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    
    // 3. Hash password
    const hashedPassword = await hashPassword(password);

     // 4. Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    
    //generate token
    const token = generateToken(user._id);
    
     // 6. Store in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });



    // 5. Send response (DO NOT send password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

      
      } catch (error) {
        console.error("Register error:", error);
    res.status(500).json({
      message: "Server error",
    });
      }

}

async function loginUser(req,res){
    const {email,password} = req.body;
    
     // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Check user
    const user = await userModel.findOne({ email });
try{
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    
    const ispasswordValid = await comparePassword(password, user.password);

    if (!ispasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

     // 4. Generate token
    const token = generateToken(user._id);

    // 5. Store in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 6. Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
}catch(error){
 console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
    });
}
}

async function logoutUser(req,res){
     try {
    // Clear cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // expire immediately
    });

    res.status(200).json({
      message: "Logged out successfully",
    });

     } catch (error) {
        console.error("Logout error:", error);
    res.status(500).json({
      message: "Server error",
    });
     }
}

export  {registerUser,loginUser,logoutUser};