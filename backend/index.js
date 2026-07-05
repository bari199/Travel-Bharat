import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors";
import "./config/passport.js";

/*
|--------------------------------------------------------------------------
| Auth & User
|--------------------------------------------------------------------------
*/
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

/*
|--------------------------------------------------------------------------
| Core Content
|--------------------------------------------------------------------------
*/
import destinationRoutes from "./routes/destinationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import eventRoutes from "./routes/eventRoutes.js"; // ← was MISSING

/*
|--------------------------------------------------------------------------
| Supporting Features
|--------------------------------------------------------------------------
*/
import stateRoutes from "./routes/stateRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import reactionRoutes from "./routes/reactionRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

/*
|--------------------------------------------------------------------------
| Request logger — helps pinpoint which endpoint is failing
|--------------------------------------------------------------------------
*/
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

/*
|--------------------------------------------------------------------------
| Health check
|--------------------------------------------------------------------------
*/
app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Server is running" });
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.use("/api/destinations",destinationRoutes);
app.use("/api/experiences",experienceRoutes);
app.use("/api/activities",activityRoutes);
app.use("/api/events",eventRoutes);

app.use("/api/states", stateRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

/*
|--------------------------------------------------------------------------
| 404 handler — returns JSON, never HTML
|--------------------------------------------------------------------------
*/
app.use((req, res) => {
  console.warn(`[404] Route not found: ${req.method} ${req.originalUrl}`);
  res
    .status(404)
    .json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

/*
|--------------------------------------------------------------------------
| Global error handler — catches any unhandled error, returns JSON
| This is what prevents Express from sending [object Object] HTML pages
|--------------------------------------------------------------------------
*/
app.use((err, req, res, _next) => {
  console.error(`[GLOBAL ERROR] ${req.method} ${req.originalUrl}:`, err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

/*
|--------------------------------------------------------------------------
| Start
|--------------------------------------------------------------------------
*/
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
