import { serverActions } from "@/actions/serverActions";
import { connectMongo, formatByPrescription } from "@/lib/mongo";
import { Prescription } from "@/models/Prescription";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const { searchParams } = new URL(`${req.url}`);
    const id = searchParams.get("id");

    if (!id) {
      response.status = 400;
      response.message = "Id is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await connectMongo();
    const prescription = await Prescription.findOne({ id: id }).exec();

    if (!prescription) {
      response.status = 404;
      response.message = "Prescription not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const formatted = await formatByPrescription(String(prescription._id));

    response.status = 200;
    response.message = "Prescription found";
    response.data = formatted;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
