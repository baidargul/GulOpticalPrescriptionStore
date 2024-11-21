import { PRESCRIPTION_TYPE } from "@/models/Prescription";
import React from "react";

type Props = {
  prescription: PRESCRIPTION_TYPE;
};

const PrescriptionRow = (props: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div>{props.prescription.name}</div>
        <div className="text-sm">
          {new Date(props.prescription.date).toDateString()} -{" "}
          {new Date(props.prescription.date).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionRow;
