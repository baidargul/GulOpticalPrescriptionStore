import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Customer's name
    phone: { type: String, required: true, unique: true }, // Unique phone number
    password: { type: String, required: true },
    active: { type: Boolean },
    isAdmin: { type: Boolean, default: true },
    prescriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
    ], // Array of prescriptions
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export type USER_TYPE = mongoose.InferSchemaType<typeof userSchema>;
