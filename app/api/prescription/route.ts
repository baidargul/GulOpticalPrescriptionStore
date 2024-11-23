import { JWTUtils } from "@/lib/jwtUtils";
import { connectMongo } from "@/lib/mongo";
import { Customer } from "@/models/Customer";
import { Prescription } from "@/models/Prescription";
import { User } from "@/models/Users";
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

    if (!data) {
      response.status = 400;
      response.message = "Invalid data";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const isValid = await JWTUtils.isValidRequest(req, "token");

    if (!isValid) {
      response.status = 400;
      response.message = "Invalid session";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.prescription.name) {
      response.status = 400;
      response.message = "Prescription name is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await User.findById(isValid._id);

    if (!user) {
      response.status = 400;
      response.message = "Invalid session, user not found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (user.active === false) {
      response.status = 400;
      response.message =
        "Your account is not approved yet to create prescriptions.";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await connectMongo();

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

    const prescriptions = await Prescription.find({
      customer: customer._id,
    })
      .sort({ date: -1 })
      .exec();

    const prescription = await Prescription.create({
      name: data.prescription.name,
      date: data.prescription.date,
      isDefault: prescriptions.length === 0 ? true : false,
      customer: customer._id,
      prescription: data.prescription.prescription,
      user: user._id,
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
    const prescriptions = await Prescription.find({}).sort({ date: -1 }).exec();
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
