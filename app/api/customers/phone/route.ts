import { connectMongo } from "@/lib/mongo";
import { Customer } from "@/models/Customer";
import { Prescription } from "@/models/Prescription";
import { NextRequest } from "next/server";
export const revalidate = 60; // Regenerate static pages every 60 seconds

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const BASE_URL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const { searchParams } = new URL(`${req.url}`);
    const phone = searchParams.get("phone");

    await connectMongo();
    const customer = await Customer.find({ phone: phone })
      .sort({ date: -1 })
      .exec();

    if (!customer || customer.length === 0) {
      response.status = 404;
      response.message = "Customer not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const prescripions = await Prescription.find({
      customer: customer[0]._id,
    })
      .sort({ date: -1 })
      .exec();

    const final = {
      customer: customer[0],
      prescriptions: prescripions,
    };

    response.status = 200;
    response.message = customer ? "Customer found" : "Customer not found";
    response.data = final;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
