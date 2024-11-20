import { NextRequest, NextResponse } from "next/server"; // Ensure this is imported
import { JWTUtils } from "@/lib/jwtUtils";
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Set this in your environment variables

export function middleware(request: any) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  try {
    const session = JWTUtils.isValidToken(token);
    // console.log(session);

    if (!session) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    }

    return NextResponse.next();
  } catch (error: any) {
    console.error("Invalid token:", error.message);
    return NextResponse.redirect(new URL("/login")); // Redirect on invalid token
  }
}

export const config = {
  matcher: ["/prescription/:path*", "/profile/:path*"], // Add protected routes here
};
