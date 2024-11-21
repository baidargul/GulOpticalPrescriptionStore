import axios from "axios";

async function listAll() {
  const response = await axios.get("/api/prescriptions");
  return response.data;
}

async function fromRange(from: Date, to: Date) {
  const response = await axios.get(
    `/api/prescription/find/between?fromDate=${from}&toDate=${to}`
  );
  return response.data;
}

export const prescription = {
  listAll,
  fromRange,
};
