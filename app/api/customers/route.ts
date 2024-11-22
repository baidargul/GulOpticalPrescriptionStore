import { JWTUtils } from "@/lib/jwtUtils";
import { connectMongo, protectPhoneNumber } from "@/lib/mongo";
import { Customer } from "@/models/Customer";
import { NextRequest } from "next/server";
export const revalidate = 60; // Regenerate static pages every 60 seconds
export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    await connectMongo();
    const customers = await Customer.find({}).exec();

    const user = await JWTUtils.isValidRequest(req, "token");

    let pres: any[] = [];
    if (user) {
      if (user.isAdmin) {
        pres = customers;
      } else {
        pres = protectPhoneNumber(customers);
      }
    }

    response.status = 200;
    response.message = `${customers.length} customers found`;
    response.data = pres;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
