import express from "express"
import 'dotenv/config'
import connectDB from "./config/db.js"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import cors from 'cors'
import "./config/passport.js"

import destinationRoutes from "./routes/destinationRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import reactionRoutes from "./routes/reactionRoutes.js";


const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


app.use(express.urlencoded({extended:true}))


app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use("/api/destinations",destinationRoutes);
app.use("/api/states",stateRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/reactions", reactionRoutes);

// http://localhost:8000/user/register


app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is listening at port ${PORT}`);  
})