import { NextRequest, NextResponse } from "next/server";

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

const isValidToken = (req: any) => {
  const token = req.headers.get("Authorization");
  const secretKey = JWT_SECRET_KEY; // Replace with your own secret key

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

export const JWTUtils = {
  generateToken,
  isValidToken,
  createResponseHeader,
};
