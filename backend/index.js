import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./config/db.js";
import "./config/passport.js";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

import destinationRoutes from "./routes/destinationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

import activityWishlistRoutes from "./routes/activityWishlistRoutes.js";
import experienceWishlistRoutes from "./routes/experienceWishlistRoutes.js";

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
| Allowed Origins
|--------------------------------------------------------------------------
*/

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",

  // Frontend (Vercel)
  "https://travel-bharat-e639.vercel.app",

  // Admin (Render)
  "https://travel-bharata.onrender.com",
];

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman/server-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked CORS:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Logger
|--------------------------------------------------------------------------
*/

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Travel Bharat Backend Running 🚀",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Healthy",
  });
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.use("/api/destinations", destinationRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/events", eventRoutes);

app.use("/api/activity-wishlist", activityWishlistRoutes);
app.use("/api/experience-wishlist", experienceWishlistRoutes);

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
| 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found : ${req.method} ${req.originalUrl}`,
  });
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database Connection Failed", err);
    process.exit(1);
  }
};

startServer();