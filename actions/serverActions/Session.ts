import { JWTUtils } from "@/lib/jwtUtils";
import axios from "axios";

const sessionPath = `/api/users/session/validate`;

async function validateSession(tokenName: string) {
  const data = {
    tokenName: tokenName,
  };
  const isValidToken = await axios.post(sessionPath, data);
  if (!isValidToken) {
    return null;
  } else {
    return isValidToken.data.data;
  }
}

export const session = {
  validateSession,
};
