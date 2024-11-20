import { connectMongo } from "@/lib/mongo";
import { User, USER_TYPE } from "@/models/Users";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    await connectMongo();
    const users = await User.find({}).exec();

    response.status = 200;
    response.message = `${users.length} users found`;
    response.data = users;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data: USER_TYPE = await req.json();

    if (!data) {
      response.status = 400;
      response.message = "Invalid data";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.phone) {
      response.status = 400;
      response.message = "Phone is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.password) {
      response.status = 400;
      response.message = "Password is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    if (!data.name) {
      response.status = 400;
      response.message = "Name is required";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    await connectMongo();

    const usersAlreadyAvailable = await User.find({}).exec();

    const thisUser = await User.findOne({ phone: data.phone }).exec();
    if (thisUser) {
      response.status = 400;
      response.message = "User already exists";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const user = await User.create({
      name: data.name,
      phone: data.phone,
      password: data.password,
      active: usersAlreadyAvailable.length > 0 ? false : true,
      isAdmin:
        usersAlreadyAvailable.length > 0
          ? data.isAdmin
            ? data.isAdmin
            : false
          : true,
    });

    response.status = 200;
    response.message = `'${user.name}' created successfully.`;
    response.data = user;
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
