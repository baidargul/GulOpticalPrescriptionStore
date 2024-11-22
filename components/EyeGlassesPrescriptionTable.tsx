"use client";
import React, { useEffect, useRef, useState } from "react";
import TextBox from "./ui/TextBox";
import { SERVER_RESPONSE, serverActions } from "@/actions/serverActions";
import { CUSTOMER_TYPE } from "@/models/Customer";
import {
  coatingType,
  materialType,
  PRESCRIPTION_TYPE,
} from "@/models/Prescription";
import Button from "./ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  phone: string;
};

const EyeGlassesPrescriptionTable = (props: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [phone, setPhone] = useState(props.phone);
  const [prescription, setPrescription] = useState<PRESCRIPTION_TYPE | any>({
    name: "",
    date: new Date(),
    isDefault: true,
    prescription: {
      near: {
        left: {
          ADD: 0,
          SPH: 0,
          AXIS: 0,
          CYL: 0,
        },
        right: {
          ADD: 0,
          SPH: 0,
          AXIS: 0,
          CYL: 0,
        },
      },
      distance: {
        left: {
          ADD: 0,
          SPH: 0,
          AXIS: 0,
          CYL: 0,
        },
        right: {
          ADD: 0,
          SPH: 0,
          AXIS: 0,
          CYL: 0,
        },
      },
      ipd: 0,
      note: "",
      lens: `CR WT`,
    },
  });
  const router = useRouter();

  useEffect(() => {
    const find = async () => {
      if (props.phone) {
        const res: SERVER_RESPONSE = await serverActions.customer.list(
          props.phone
        );
        if (res.status === 200) {
          console.log(res.data);
          setPrescription((prev: any) => {
            return {
              ...prev,
              name: res.data?.customer.name || "",
            };
          });
        }
      }
    };

    find();
    setIsMounted(true);
  }, []);
  const handleCreateCard = async () => {
    setIsSaving(true);
    const temp = await serverActions.customer.addPrescription(
      props.phone,
      prescription
    );

    if (temp.status === 200) {
      router.push(`/find`);
    }
    setIsSaving(false);
  };

  const handleChange = {
    near: {
      right: {
        SPH: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                near: {
                  ...prev.prescription.near,
                  right: { ...prev.prescription.near.right, SPH: value },
                },
              },
            };
          });
        },
        CYL: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                near: {
                  ...prev.prescription.near,
                  right: { ...prev.prescription.near.right, CYL: value },
                },
              },
            };
          });
        },
        AXIS: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                near: {
                  ...prev.prescription.near,
                  right: { ...prev.prescription.near.right, AXIS: value },
                },
              },
            };
          });
        },
        ADD: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                near: {
                  ...prev.prescription.near,
                  right: { ...prev.prescription.near.right, ADD: value },
                },
              },
            };
          });
        },
      },
      left: {
        SPH: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                near: {
                  ...prev.prescription.near,
                  left: { ...prev.prescription.near.left, SPH: value },
                },
              },
            };
          });
        },
        CYL: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                near: {
                  ...prev.prescription.near,
                  left: { ...prev.prescription.near.left, CYL: value },
                },
              },
            };
          });
        },
        AXIS: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                near: {
                  ...prev.prescription.near,
                  left: { ...prev.prescription.near.left, AXIS: value },
                },
              },
            };
          });
        },
        ADD: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                near: {
                  ...prev.prescription.near,
                  left: { ...prev.prescription.near.left, ADD: value },
                },
              },
            };
          });
        },
      },
    },
    distance: {
      right: {
        SPH: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                distance: {
                  ...prev.prescription.distance,
                  right: { ...prev.prescription.distance.right, SPH: value },
                },
              },
            };
          });
        },
        CYL: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                distance: {
                  ...prev.prescription.distance,
                  right: { ...prev.prescription.distance.right, CYL: value },
                },
              },
            };
          });
        },
        AXIS: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                distance: {
                  ...prev.prescription.distance,
                  right: { ...prev.prescription.distance.right, AXIS: value },
                },
              },
            };
          });
        },
        ADD: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                distance: {
                  ...prev.prescription.distance,
                  right: { ...prev.prescription.distance.right, ADD: value },
                },
              },
            };
          });
        },
      },
      left: {
        SPH: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                distance: {
                  ...prev.prescription.distance,
                  left: { ...prev.prescription.distance.left, SPH: value },
                },
              },
            };
          });
        },
        CYL: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                distance: {
                  ...prev.prescription.distance,
                  left: { ...prev.prescription.distance.left, CYL: value },
                },
              },
            };
          });
        },
        AXIS: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                distance: {
                  ...prev.prescription.distance,
                  left: { ...prev.prescription.distance.left, AXIS: value },
                },
              },
            };
          });
        },
        ADD: (value: string) => {
          setPrescription((prev: any) => {
            return {
              ...prev,
              prescription: {
                ...prev.prescription,
                distance: {
                  ...prev.prescription.distance,
                  left: { ...prev.prescription.distance.left, ADD: value },
                },
              },
            };
          });
        },
      },
    },
    name: (value: string) => {
      setPrescription({ ...prescription, name: value });
      setPrescription((prev: any) => {
        return {
          ...prev,
          name: value,
        };
      });
    },
    phone: (value: string) => {
      setPhone(value);
    },
    ipd: (value: number) => {
      setPrescription({
        ...prescription,
        prescription: {
          ...prescription.prescription,
          ipd: value ? Number(value) : 0,
        },
      });
    },
    note: (value: string) => {
      setPrescription({
        ...prescription,
        prescription: {
          ...prescription.prescription,
          note: value ? String(value) : "",
        },
      });
    },
    lens: (value: string) => {
      setPrescription({
        ...prescription,
        prescription: {
          ...prescription.prescription,
          lens: value ? String(value) : "",
        },
      });
    },
  };

  if (!isMounted) return null;

  return (
    <div
      className={`w-full select-none flex justify-center items-center ${
        isSaving ? "animate-pulse opacity-50" : "opacity-100"
      }`}
    >
      <div className="bg-white max-w-[700px] p-6 rounded-lg shadow-md scale-90 sm:scale-100 relative">
        <div
          title="Goto Home"
          className="absolute -top-4 -left-4 cursor-pointer z-10 p-2 bg-white hover:bg-red-500 group rounded-full border"
        >
          <Link href={"/"}>
            <ChevronLeft
              size={20}
              className="text-zinc-500 group-hover:text-white hover:rotate-0 rotate-45 transition-all duration-500"
            />
          </Link>
        </div>
        <h2 className="text-lg font-bold mb-4 hidden sm:block">
          Eye Glasses Prescription
        </h2>
        <div className="flex justify-between items-end sm:items-center w-full mb-4">
          <div className="flex flex-col-reverse sm:flex-row gap-2 items-start sm:items-center">
            <div className="text-lg font-semibold">
              <TextBox
                value={prescription.name ? prescription.name : ""}
                setValue={handleChange.name}
                placeholder="Name"
                label="Name"
              />
            </div>
            <div className="tracking-widest">
              {phone ? (
                <div className="p-1 bg-zinc-100 text-xs sm:text-base rounded">
                  {phone}
                </div>
              ) : (
                <TextBox
                  value={phone ? phone : ""}
                  setValue={handleChange.phone}
                  placeholder="Phone"
                  label="Phone"
                />
              )}
            </div>
          </div>
          <div className="text-right text-wrap">
            <Image
              src={`/images/gul optical.png`}
              width={200}
              height={200}
              alt="gul-opticals"
              className="w-12 h-12 object-contain ml-auto sm:hidden"
            />
            {prescription
              ? prescription && new Date(prescription.date).toDateString()
              : new Date().toDateString()}
          </div>
        </div>
        {/* DESKTOP */}
        <table className="table-auto max-w-[700px] border-collapse border border-gray-300 text-sm hidden sm:block">
          <thead className="bg-white">
            <tr>
              <th className="pl-2 sm:px-4 sm:py-2">
                <Image
                  src={`/images/gul optical.png`}
                  width={200}
                  height={200}
                  alt="gul-opticals"
                  className="w-12 h-12 object-contain"
                />
              </th>
              <th className="border-none border-gray-300 px-4 py-2" colSpan={4}>
                Right
              </th>
              <th className="border-r border-gray-300 px-4 py-2" colSpan={4}>
                Left
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2"></th>
              <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                SPH
              </th>
              <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                CYL
              </th>
              <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                AXIS
              </th>
              <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                ADD
              </th>
              <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                SPH
              </th>
              <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                CYL
              </th>
              <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                AXIS
              </th>
              <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                ADD
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Distance */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <div className="hidden sm:block">Distance</div>
                <div className="sm:hidden font-semibold">D</div>
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.distance.right.SPH}
                  value={String(
                    prescription.prescription?.distance?.right?.SPH
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.distance.right.CYL}
                  value={String(
                    prescription.prescription?.distance?.right?.CYL
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.distance.right.AXIS}
                  value={String(
                    prescription.prescription?.distance?.right?.AXIS
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.distance.right.ADD}
                  value={String(
                    prescription.prescription?.distance?.right?.ADD
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.distance.left.SPH}
                  value={String(prescription.prescription?.distance?.left?.SPH)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.distance.left.CYL}
                  value={String(prescription.prescription?.distance?.left?.CYL)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.distance.left.AXIS}
                  value={String(
                    prescription.prescription?.distance?.left?.AXIS
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.distance.left.ADD}
                  value={String(prescription.prescription?.distance?.left?.ADD)}
                />
              </td>
            </tr>
            {/* Near */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <div className="hidden sm:block">Near</div>
                <div className="sm:hidden font-semibold">N</div>
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  setValue={handleChange.near.right.SPH}
                  type="number"
                  value={String(prescription.prescription?.near?.right?.SPH)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  setValue={handleChange.near.right.CYL}
                  type="number"
                  value={String(prescription.prescription?.near?.right?.CYL)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.near.right.AXIS}
                  value={String(prescription.prescription?.near?.right?.AXIS)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.near.right.ADD}
                  value={String(prescription.prescription?.near?.right?.ADD)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.near.left.SPH}
                  value={String(prescription.prescription?.near?.left?.SPH)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.near.left.CYL}
                  value={String(prescription.prescription?.near?.left?.CYL)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.near.left.AXIS}
                  value={String(prescription.prescription?.near?.left?.AXIS)}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={handleChange.near.left.ADD}
                  value={String(prescription.prescription?.near?.left?.ADD)}
                />
              </td>
            </tr>
            {/* IPD and Notes in the Same Row */}
            <tr>
              <td
                className="border border-gray-300 px-4 py-2 tracking-wide"
                colSpan={2}
              >
                I.P.D.
              </td>
              <td className="border border-gray-300 px-4 py-2" colSpan={1}>
                <TextBox
                  textAlign="center"
                  type="number"
                  setValue={(value: string) => handleChange.ipd(Number(value))}
                  value={String(prescription.prescription?.ipd)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2" colSpan={1}>
                Notes
              </td>
              <td className="border border-gray-300 px-4 py-2" colSpan={7}>
                <TextBox
                  setValue={handleChange.note}
                  value={prescription.prescription?.note}
                  className="border-amber-200 bg-yellow-50 rounded"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* MOBILE */}
        <div className="flex flex-col gap-5 sm:hidden">
          {/* RIGHT */}
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm ">
            <thead className="bg-white">
              <tr>
                <th
                  className="border-none border-gray-300 px-4 py-2"
                  colSpan={5}
                >
                  Right
                </th>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                  SPH
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                  CYL
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                  AXIS
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                  ADD
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Distance */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="hidden sm:block">Distance</div>
                  <div className="sm:hidden font-semibold">D</div>
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.distance.right.SPH}
                    value={String(
                      prescription.prescription?.distance?.right?.SPH
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    type="number"
                    textAlign="center"
                    setValue={handleChange.distance.right.CYL}
                    value={String(
                      prescription.prescription?.distance?.right?.CYL
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    type="number"
                    textAlign="center"
                    setValue={handleChange.distance.right.AXIS}
                    value={String(
                      prescription.prescription?.distance?.right?.AXIS
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    type="number"
                    textAlign="center"
                    setValue={handleChange.distance.right.ADD}
                    value={String(
                      prescription.prescription?.distance?.right?.ADD
                    )}
                  />
                </td>
              </tr>
              {/* Near */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="hidden sm:block">Near</div>
                  <div className="sm:hidden font-semibold">N</div>
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    setValue={handleChange.near.right.SPH}
                    type="number"
                    value={String(prescription.prescription?.near?.right?.SPH)}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.near.right.CYL}
                    value={String(prescription.prescription?.near?.right?.CYL)}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.near.right.AXIS}
                    value={String(prescription.prescription?.near?.right?.AXIS)}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.near.right.ADD}
                    value={String(prescription.prescription?.near?.right?.ADD)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* LEFT */}
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead className="bg-white">
              <tr>
                <th className="border-r border-gray-300 px-4 py-2" colSpan={5}>
                  Left
                </th>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                  SPH
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                  CYL
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                  AXIS
                </th>
                <th className="border border-gray-300 px-4 py-2 text-xs sm:text-base">
                  ADD
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Distance */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="hidden sm:block">Distance</div>
                  <div className="sm:hidden font-semibold">D</div>
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.distance.left.SPH}
                    value={String(
                      prescription.prescription?.distance?.left?.SPH
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.distance.left.CYL}
                    value={String(
                      prescription.prescription?.distance?.left?.CYL
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.distance.left.AXIS}
                    value={String(
                      prescription.prescription?.distance?.left?.AXIS
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.distance.left.ADD}
                    value={String(
                      prescription.prescription?.distance?.left?.ADD
                    )}
                  />
                </td>
              </tr>
              {/* Near */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="hidden sm:block">Near</div>
                  <div className="sm:hidden font-semibold">N</div>
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.near.left.SPH}
                    value={String(prescription.prescription?.near?.left?.SPH)}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.near.left.CYL}
                    value={String(prescription.prescription?.near?.left?.CYL)}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.near.left.AXIS}
                    value={String(prescription.prescription?.near?.left?.AXIS)}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    setValue={handleChange.near.left.ADD}
                    value={String(prescription.prescription?.near?.left?.ADD)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-2 justify-between items-center">
            <div className="tracking-wide">I.P.D.</div>
            <div className="w-[20%]">
              <TextBox
                textAlign="center"
                type="number"
                setValue={(value: string) => handleChange.ipd(Number(value))}
                value={String(prescription.prescription?.ipd)}
              />
            </div>
            <div className="">Notes</div>
            <div className="">
              <TextBox
                setValue={handleChange.note}
                value={prescription.prescription?.note}
                className="border-amber-200 bg-yellow-50 rounded"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 w-full">
          <LensOptions setSelectedLens={handleChange.lens} />
        </div>

        <div className="flex justify-end items-center w-full mt-4">
          <div className="w-full sm:w-fit">
            <Button onClick={handleCreateCard}>Create</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeGlassesPrescriptionTable;
type LensOptionsProps = {
  setSelectedLens: any;
};
const LensOptions = (props: LensOptionsProps) => {
  const [selectedValue, setSelectedValue] = useState<{
    material: materialType;
    type: coatingType;
  }>({ material: "CR", type: "WT" });
  const handleSelect = (material: materialType, type: coatingType) => {
    setSelectedValue({ material, type });
    props.setSelectedLens(`${material} ${type}`);
  };

  return (
    <>
      <div className="font-bold my-2">Lens:</div>
      <div className="flex gap-1 items-start sm:items-center">
        <div className="font-semibold sm:text-sm p-1">CR:</div>
        <div className="flex flex-wrap w-full gap-1 justify-between sm:justify-normal items-center sm:text-xs">
          <div
            onClick={() => handleSelect("CR", "WT")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "CR" && selectedValue.type === "WT"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            WT
          </div>
          <div
            onClick={() => handleSelect("CR", "MC")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "CR" && selectedValue.type === "MC"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            MC
          </div>
          <div
            onClick={() => handleSelect("CR", "BC")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "CR" && selectedValue.type === "BC"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            BC
          </div>
          <div
            onClick={() => handleSelect("CR", "PG")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "CR" && selectedValue.type === "PG"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            PG
          </div>
          <div
            onClick={() => handleSelect("CR", "PB")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "CR" && selectedValue.type === "PB"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            PB
          </div>
          <div
            onClick={() => handleSelect("CR", "PG BC")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "CR" && selectedValue.type === "PG BC"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            PG BC
          </div>
          <div
            onClick={() => handleSelect("CR", "PB BC")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "CR" && selectedValue.type === "PB BC"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            PB BC
          </div>
        </div>
      </div>
      <div className="flex gap-1 items-start sm:items-center mt-2">
        <div className="font-semibold sm:text-sm p-1">GL:</div>
        <div className="flex flex-wrap w-full gap-1 justify-between sm:justify-normal items-center sm:text-xs">
          <div
            onClick={() => handleSelect("GL", "WT")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "GL" && selectedValue.type === "WT"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            WT
          </div>
          <div
            onClick={() => handleSelect("GL", "MC")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "GL" && selectedValue.type === "MC"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            MC
          </div>
          <div
            onClick={() => handleSelect("GL", "BC")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "GL" && selectedValue.type === "BC"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            BC
          </div>
          <div
            onClick={() => handleSelect("GL", "PG")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "GL" && selectedValue.type === "PG"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            PG
          </div>
          <div
            onClick={() => handleSelect("GL", "PB")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "GL" && selectedValue.type === "PB"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            PB
          </div>
          <div
            onClick={() => handleSelect("GL", "PG BC")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "GL" && selectedValue.type === "PG BC"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            PG BC
          </div>
          <div
            onClick={() => handleSelect("GL", "PB BC")}
            className={` p-1 rounded cursor-pointer ${
              selectedValue.material === "GL" && selectedValue.type === "PB BC"
                ? "bg-amber-400/20 border border-amber-400 font-bold"
                : "bg-zinc-50"
            }`}
          >
            PB BC
          </div>
        </div>
      </div>
    </>
  );
};
