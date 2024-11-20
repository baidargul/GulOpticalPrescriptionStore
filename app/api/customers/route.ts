import { connectMongo } from "@/lib/mongo";
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

    response.status = 200;
    response.message = `${customers.length} customers found`;
    response.data = customers;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
