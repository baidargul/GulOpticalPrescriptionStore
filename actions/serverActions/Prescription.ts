import axios from "axios";
import { toast } from "sonner";

async function listAll() {
  const response = await axios.get("/api/prescriptions");
  return response.data;
}

async function fromRange(from: Date, to: Date) {
  if (!from) {
    toast.warning("From date is required");
  }

  if (!to) {
    toast.warning("To date is required");
  }
  const response = await axios.get(
    `/api/prescription/find/between?fromDate=${from}&toDate=${to}`
  );
  return response.data;
}

async function list(id: string) {
  const response = await axios.get(`/api/prescription/find?_id=${id}`);
  return response.data;
}

export const prescription = {
  list,
  listAll,
  fromRange,
};
