import userModel from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // from protect middleware

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // update fields
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};