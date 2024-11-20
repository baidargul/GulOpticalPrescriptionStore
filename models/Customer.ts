import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Customer's name
  phone: { type: String, required: true, unique: true }, // Unique phone number
  lastActive: { type: Date, default: Date.now }, // Last active timestamp
  prescriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
  ],
});

export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export type CUSTOMER_TYPE = mongoose.InferSchemaType<typeof customerSchema>;
