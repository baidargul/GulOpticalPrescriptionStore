import { serverActions } from "@/actions/serverActions";
import { connectMongo } from "@/lib/mongo";
import { Prescription, PRESCRIPTION_TYPE } from "@/models/Prescription";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const page = (props: Props) => {
  return <div>page</div>;
};

export default page;

export const generateStaticParams = async () => {
  // await connectMongo();
  const prescriptions = await Prescription.find({}).lean();

  return prescriptions.map((prescription) => ({
    id: String(prescription._id),
  }));
};
