import { customer } from "./serverActions/Customer";
import { prescription } from "./serverActions/Prescription";

export type SERVER_RESPONSE = {
  status: number;
  message: string;
  data: any;
};

export const serverActions = {
  customer,
  prescription,
};
