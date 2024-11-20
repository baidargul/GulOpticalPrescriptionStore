import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const uri: string = process.env.MONGO_URI || ""; // MongoDB connection URI

// Function to connect to MongoDB
export const connectMongo = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB via Mongoose!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};
