import mongoose from "mongoose";
import dotenv from "dotenv";
import { Prescription, PRESCRIPTION_TYPE } from "@/models/Prescription";
import { Customer } from "@/models/Customer";
import { User } from "@/models/Users";
import { JWTUtils } from "./jwtUtils";

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

export function protectPhoneNumber(arr: any[]) {
  let target = [];
  if (!Array.isArray(arr)) {
    target.push(arr);
  } else {
    target = arr;
  }

  // Mask phone numbers
  const protectedCustomers = target.map((customer) => ({
    ...customer,
    phone: `${String(customer.phone).slice(0, 3)}****${String(
      customer.phone
    ).slice(8, 11)}`, // Replace phone with masked value
  }));

  return protectedCustomers;
}

export async function formatByPrescription(
  prescriptionId: string,
  isAdmin?: boolean
) {
  await connectMongo();
  const prescription: PRESCRIPTION_TYPE = await Prescription.findById(
    prescriptionId
  ).exec();

  if (!prescription) {
    return null;
  }

  const user = await User.findById({ _id: prescription.user }).exec();

  if (!user) {
    return null;
  }

  const cid = String(prescription.customer);
  const customer: any = await Customer.findOne({ _id: cid }).exec();

  if (!customer) {
    return null;
  }

  let pres: any = customer;
  if (isAdmin) {
    pres = customer;
  } else {
    pres = protectPhoneNumber(customer);
  }

  if (Array.isArray(pres)) {
    pres = pres[0];
  }

  let final = {
    prescription,
    customer: pres,
    user: user,
  };

  return final;
}
