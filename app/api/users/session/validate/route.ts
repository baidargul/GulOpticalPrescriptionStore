import { JWTUtils } from "@/lib/jwtUtils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    if (!data.tokenName) {
      response.status = 400;
      response.message = "Token name not provided to validate session";
      response.data = data;
      return new Response(JSON.stringify(response));
    }

    const validateToken = JWTUtils.isValidRequest(req, data.tokenName);
    if (!validateToken) {
      response.status = 400;
      response.message = "Invalid session";
      response.data = null;
      return new Response(JSON.stringify(response));
    }

    const expirationDate = validateToken.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const isExpired = now > expirationDate;

    response.status = 200;
    response.message = "";
    response.data = { ...validateToken, isExpired: isExpired };
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
