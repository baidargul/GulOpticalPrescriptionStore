//npm install jose
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
// require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

type RESPONSE = {
  status: number;
  message: string;
  data: any;
};

const generateToken = (payload: any) => {
  const secretKey = JWT_SECRET_KEY; // Replace with your own secret key
  const options = {
    expiresIn: "1d", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const isValidToken = async (token: string) => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // Secret key as ArrayBuffer

  try {
    console.log("Verifying token:", token);
    // Verify token using jose
    const { payload } = await jwtVerify(token, secretKey);

    console.log("Decoded payload:", payload);

    return payload;
  } catch (err: any) {
    console.error("Token verification failed:", err.message);
    return null;
  }
};

const isValidRequest = (req: any, tokenName: string) => {
  const secretKey = JWT_SECRET_KEY;
  const token = req.cookies.get(tokenName).value;
  if (!token) return null;

  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

const createResponseHeader = (response: RESPONSE, token: string) => {
  const headers = new Headers();
  headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/;`);
  return new Response(JSON.stringify(response), { headers });
};

const decodeToken = (token: string) => {
  const secretKey = JWT_SECRET_KEY; // Replace with your own secret key
  return jwt.decode(token, secretKey);
};

const isExpired = (token: string) => {
  const secretKey = JWT_SECRET_KEY; // Replace with your own secret key
  try {
    const decodedToken = jwt.decode(token, secretKey);
    const expirationDate = decodedToken.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    return now > expirationDate;
  } catch (err) {
    return true;
  }
};

export const JWTUtils = {
  generateToken,
  createResponseHeader,
  isValidRequest,
  isValidToken,
  decodeToken,
  isExpired,
};
