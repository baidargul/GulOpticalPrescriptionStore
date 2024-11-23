import { JWTUtils } from "@/lib/jwtUtils";
import {
  coatingType,
  materialType,
  Prescription,
  PRESCRIPTION_TYPE,
} from "@/models/Prescription";
import axios from "axios";
import { toast } from "sonner";

async function listAll() {
  const response = await axios.get("/api/customers");
  return response.data;
}

async function list(phone: string) {
  if (!phone) {
    toast.warning("Phone is required");
  }
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await axios.get(`/api/customers/phone?phone=${phone}`);
  // const response = await axios.get(`/api/customers/phone?phone=${phone}`);
  return response.data;
}

async function addPrescription(phone: string, prescription: PRESCRIPTION_TYPE) {
  if (!phone) {
    toast.warning("Phone is required");
  }

  if (!prescription.name) {
    toast.warning("Name is required");
  }

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
