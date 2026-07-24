import express from "express"
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser, verification, verifyOTP,resendVerificationMail } from "../controllers/userController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { userSchema, validateUser } from "../validators/userValidate.js"

const router = express.Router()


router.post('/register',validateUser(userSchema), registerUser)
router.post('/verify', verification)
router.post('/login', loginUser)
router.post('/logout',isAuthenticated, logoutUser)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp/:email', verifyOTP)
router.post("/resend-verification", resendVerificationMail);
router.post('/change-password/:email', changePassword)

export default router