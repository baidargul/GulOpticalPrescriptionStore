import { User } from "@/models/Users";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const { searchParams } = new URL(`${req.url}`);
    const phone = searchParams.get("phone");
    const password = searchParams.get("password");

    if (!phone || !password) {
      response.status = 400;
      response.message = "Phone and password are required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await User.findOne({ phone: phone }).exec();

    if (user) {
      if (user.password === password) {
        response.status = 200;
        response.message = "User found";
        response.data = user;
        return new Response(JSON.stringify(response));
      } else {
        response.status = 400;
        response.message = "Wrong password";
        response.data = null;
        return new Response(JSON.stringify(response));
      }
    }
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
