import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Prescription name
    date: { type: Date, required: true, default: Date.now }, // Prescription date
    isDefault: { type: Boolean, default: false }, // Indicates if this is the default prescription
    prescription: {
      near: {
        right: {
          SPH: { type: Number, default: 0 },
          CYL: { type: Number, default: 0 },
          AXIS: { type: Number, default: 0 },
          ADD: { type: Number, default: 0 },
        },
        left: {
          SPH: { type: Number, default: 0 },
          CYL: { type: Number, default: 0 },
          AXIS: { type: Number, default: 0 },
          ADD: { type: Number, default: 0 },
        },
      },
      distance: {
        right: {
          SPH: { type: Number, default: 0 },
          CYL: { type: Number, default: 0 },
          AXIS: { type: Number, default: 0 },
          ADD: { type: Number, default: 0 },
        },
        left: {
          SPH: { type: Number, default: 0 },
          CYL: { type: Number, default: 0 },
          AXIS: { type: Number, default: 0 },
          ADD: { type: Number, default: 0 },
        },
      },
      ipd: { type: Number, default: 0 },
      note: { type: String, default: "" },
      lens: { type: String },
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Prescription =
  mongoose.models.Prescription ||
  mongoose.model("Prescription", prescriptionSchema);

export type PRESCRIPTION_TYPE = mongoose.InferSchemaType<
  typeof prescriptionSchema
>;

export type materialType = "CR" | "GL";
export type coatingType = "WT" | "MC" | "BC" | "PG" | "PB" | "PG BC" | "PB BC";
