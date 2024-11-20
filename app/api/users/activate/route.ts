import { User, USER_TYPE } from "@/models/Users";
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

    if (!phone) {
      response.status = 400;
      response.message = "Phone is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user: USER_TYPE = await User.findOne({ phone: phone }).exec();

    if (!user) {
      response.status = 400;
      response.message = "No user found";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const newUser = await User.findOneAndUpdate(
      { phone: phone },
      { active: true },
      { new: true }
    );

    response.status = 200;
    response.message = "User found";
    response.data = newUser;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
