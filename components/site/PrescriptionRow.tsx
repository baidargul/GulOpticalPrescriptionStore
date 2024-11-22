import { prescription } from "@/actions/serverActions/Prescription";
import { PRESCRIPTION_TYPE } from "@/models/Prescription";
import React from "react";

type Props = {
  index?: number;
  length?: number;
  data: any;
};

const PrescriptionRow = (props: Props) => {
  return (
    <div className="flex flex-col gap-1 border-b py-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <div className="opacity-40">
            {Number(Number(props.length) - Number(props.index))}-
          </div>
          <div className="font-semibold flex flex-col sm:flex-row items-start gap-0 sm:gap-2">
            <div className="">{props.data.prescription.name}</div>
            <div className="font-normal text-xs sm:text-sm tracking-widest">
              {props.data.customer.phone}
            </div>
          </div>
        </div>
        <div className="text-xs text-right">
          <div>{new Date(props.data.prescription.date).toDateString()}</div>
          <div>
            {new Date(props.data.prescription.date).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionRow;
