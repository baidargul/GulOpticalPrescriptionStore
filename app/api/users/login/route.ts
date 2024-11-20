import { JWTUtils } from "@/lib/jwtUtils";
import { connectMongo } from "@/lib/mongo";
import { User, USER_TYPE } from "@/models/Users";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: any) {
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

    await connectMongo();

    const user: any = await User.findOne({ phone: String(phone) }).exec();

    if (user) {
      if (user.password === password) {
        const token = JWTUtils.generateToken(user.toJSON());

        response.status = 200;
        response.message = "User found";
        response.data = user;
        const newResponse = JWTUtils.createResponseHeader(response, token);
        return newResponse;
      } else {
        response.status = 400;
        response.message = "Wrong password";
        response.data = null;
        return new Response(JSON.stringify(response));
      }
    } else {
      response.status = 400;
      response.message = "No user found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
