import mongoose from "mongoose";

const connectDB = async () => {
  try {

    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected ");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/TravelBharat`);

  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};

export default connectDB;