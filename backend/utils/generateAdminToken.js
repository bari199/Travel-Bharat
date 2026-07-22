import jwt from "jsonwebtoken";

export const generateAdminToken = (adminId) => {
  return jwt.sign(
    {
      adminId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};