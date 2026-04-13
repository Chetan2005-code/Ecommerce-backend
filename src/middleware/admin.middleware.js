export const admin = (req, res, next) => {
  try {
    // check if user exists (from protect middleware)
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    // check role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied (Admin only)",
      });
    }

    next(); // allow access

  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};