import { connectMongo } from "@/lib/mongo";
import { Customer } from "@/models/Customer";
import { Prescription } from "@/models/Prescription";
import { NextRequest } from "next/server";
export const revalidate = 60; // Regenerate static pages every 60 seconds

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    const db = await connectMongo();

    let customer = await Customer.findOne({ phone: data.phone }).exec();

    let isDefault = true;

    if (customer) {
      if (customer?.prescription?.length > 0) {
        isDefault = false;
      }
    } else {
      customer = await Customer.create({
        name: data.prescription.name,
        phone: data.phone,
      });
    }

    if (!customer) {
      response.status = 500;
      response.message = "Unable to create customer";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const prescriptions = await Prescription.find({ customer: customer._id });

    const prescription = await Prescription.create({
      name: data.prescription.name,
      date: data.prescription.date,
      isDefault: prescriptions.length === 0 ? true : false,
      customer: customer._id,
      prescription: data.prescription.prescription,
    });

    if (!prescription) {
      response.status = 500;
      response.message = "Unable to add prescription";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    response.status = 200;
    response.message = "Prescription added";
    response.data = prescription;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    await connectMongo();
    const prescriptions = await Prescription.find({}).exec();
    response.status = 200;
    response.message = `${prescriptions.length} prescriptions found`;
    response.data = prescriptions;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
