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
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


// ================================
// GOOGLE CALLBACK
// ================================

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
  }),

  async (req, res) => {
    try {
      const accessToken = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );

      const refreshToken = jwt.sign(
        {
          id: req.user._id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );

      return res.redirect(
        `${process.env.FRONTEND_URL}/auth-success?accessToken=${encodeURIComponent(
          accessToken
        )}&refreshToken=${encodeURIComponent(refreshToken)}`
      );
    } catch (error) {
      console.error("Google callback error:", error);

      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=google_failed`
      );
    }
  }
);


// ================================
// GET CURRENT USER
// ================================

router.get(
  "/me",
  isAuthenticated,
  (req, res) => {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);


router.post("/login", adminLogin);

export default router;