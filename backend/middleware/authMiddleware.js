// import jwt from "jsonwebtoken";
// import { Admin } from "../models/adminModel.js";

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader?.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const admin = await Admin.findById(decoded.id).select("-password");

//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         message: "Admin not found",
//       });
//     }

//     req.admin = admin;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };

// export default authMiddleware;


import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

 const adminAuth = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if Bearer token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token is missing.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find Admin
    const admin = await Admin.findById(decoded.adminId).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Admin not found.",
      });
    }

    // Attach admin to request
    req.admin = admin;

    next();
  } catch (error) {
    console.error("Admin Authentication Error:", error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};

export default adminAuth;

