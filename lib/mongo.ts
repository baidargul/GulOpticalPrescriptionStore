import mongoose from "mongoose";
import dotenv from "dotenv";
import { Prescription, PRESCRIPTION_TYPE } from "@/models/Prescription";
import { Customer } from "@/models/Customer";

dotenv.config(); // Load environment variables from .env file

const uri: string = process.env.MONGODB_URI || ""; // MongoDB connection URI

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

export async function formatByPrescription(prescriptionId: string) {
  await connectMongo();
  const prescription: PRESCRIPTION_TYPE = await Prescription.findById(
    prescriptionId
  ).exec();

  if (!prescription) {
    return null;
  }

  const cid = String(prescription.customer);
  const customer: any = await Customer.findOne({ _id: cid }).exec();

  if (!customer) {
    return null;
  }

  let final = {
    prescription,
    customer: customer,
  };

  return final;
}
