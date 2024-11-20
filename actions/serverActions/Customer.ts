import {
  coatingType,
  materialType,
  Prescription,
  PRESCRIPTION_TYPE,
} from "@/models/Prescription";
import axios from "axios";

async function listAll() {
  const response = await axios.get("/api/customers");
  return response.data;
}

async function list(phone: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await axios.get(
    `${BASE_URL}/api/customers/phone?phone=${phone}`
  );
  // const response = await axios.get(`/api/customers/phone?phone=${phone}`);
  return response.data;
}

async function addPrescription(phone: string, prescription: PRESCRIPTION_TYPE) {
  const data = {
    phone: phone,
    prescription: prescription,
  };
  const response = await axios.post("/api/prescription", data);
  return response.data;
}

export const customer = {
  list,
  listAll,
  addPrescription,
};
