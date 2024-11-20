import axios from "axios";

async function listAll() {
  const response = await axios.get("/api/prescriptions");
  return response.data;
}

export const prescription = {
  listAll,
};
