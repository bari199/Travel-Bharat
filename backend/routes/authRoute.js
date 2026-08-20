import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { adminLogin } from "../controllers/authController.js";
import { Session } from "../models/sessionModel.js";

const router = express.Router();

//Step-1: Redirect to Google login
router.get("/google", passport.authenticate("google", {scope:["profile", "email"]}))

// router.get("/google/callback", 

//     passport.authenticate("google", {session:false}),
//     (req, res)=>{
//         try {
//             const token = jwt.sign({id:req.user._id, email:req.user.email}, process.env.SECRET_KEY, {expiresIn:"7d"})
//             res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`)
//         } catch (error) {
//             console.error("Google login error:", error)
//             res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`)
//         }
//     }
// )


router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  async (req, res) => {
    try {
      const user = req.user;

      // Remove old session
      await Session.deleteMany({
        userId: user._id,
      });

      // Create new session
      await Session.create({
        userId: user._id,
      });

      // Generate Access Token
      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "100d",
        }
      );

      // Generate Refresh Token
      const refreshToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "300d",
        }
      );

      // Update login status
      user.isLoggedIn = true;
      await user.save();

      console.log("✅ Google Login Successful:", user.email);

      res.redirect(
        `${process.env.CLIENT_URL}/auth-success?accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
    } catch (error) {
      console.error("❌ Google login error:", error);

      res.redirect(
        `${process.env.CLIENT_URL}/login?error=google_failed`
      );
    }
  }
);

router.get("/me", isAuthenticated, (req, res)=>{
    res.json({success:true, user:req.user})
})






router.post("/login",adminLogin);

export default router;