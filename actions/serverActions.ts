import { customer } from "./serverActions/Customer";
import { prescription } from "./serverActions/Prescription";
import { user } from "./serverActions/User";

export type SERVER_RESPONSE = {
  status: number;
  message: string;
  data: any;
};

export const serverActions = {
  user,
  customer,
  prescription,
};
