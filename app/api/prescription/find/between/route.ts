import { JWTUtils } from "@/lib/jwtUtils";
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
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");

    if (!fromDate || !toDate) {
      response.status = 400;
      response.message = "From date and to date are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await connectMongo();
    const prescriptions = await Prescription.find({
      date: {
        $gte: new Date(fromDate).toISOString(),
        $lte: new Date(toDate).toISOString(),
      },
    })
      .sort({ date: -1 })
      .exec();

    let data = [];
    for (const item of prescriptions) {
      const employee = await JWTUtils.isValidRequest(req, "token");
      let formatted;
      if (!employee) {
        formatted = await formatByPrescription(String(item._id));
      } else {
        formatted = await formatByPrescription(
          String(item._id),
          employee.isAdmin === true
        );
      }
      data.push(formatted);
    }

    console.log(data);

    response.status = 200;
    response.message = `${prescriptions.length} prescriptions found`;
    response.data = data;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
