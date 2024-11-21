import { USER_TYPE } from "@/models/Users";
import axios from "axios";
import { session } from "./Session";

async function listAll() {
  const response = await axios.get("/api/users");
  return response.data;
}

async function list(phone: string) {
  const response = await axios.get(`/api/users/phone?phone=${phone}`);
  return response.data;
}

async function create(user: USER_TYPE) {
  const response = await axios.post("/api/users", user);
  return response.data;
}

async function deactivate(phone: string) {
  const response = await axios.post(`/api/users/suspend?phone=${phone}`);
  return response.data;
}

async function activate(phone: string) {
  const response = await axios.post(`/api/users/activate?phone=${phone}`);
  return response.data;
}

async function login(phone: string, password: string) {
  const response = await axios.get(
    `/api/users/login?phone=${phone}&password=${password}`
  );
  return response.data;
}

async function logout(tokenName: string) {
  //kill cookie with this token
  document.cookie = `${tokenName}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
}

export const user = {
  list,
  listAll,
  login,
  logout,
  create,
  activate,
  deactivate,
  session,
};
