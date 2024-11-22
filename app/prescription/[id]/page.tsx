import { SERVER_RESPONSE, serverActions } from "@/actions/serverActions";
import Button from "@/components/ui/Button";
import TextBox from "@/components/ui/TextBox";
import { connectMongo, formatByPrescription } from "@/lib/mongo";
import {
  coatingType,
  materialType,
  Prescription,
  PRESCRIPTION_TYPE,
} from "@/models/Prescription";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// export const generateStaticParams = async () => {
//   await connectMongo();
//   const prescriptions = await Prescription.find({}).exec();

//   return prescriptions.map((prescription) => ({
//     id: String(prescription._id),
//   }));
// };

type Props = {
  params: Promise<{ id: string }>;
};

const page = async (props: Props) => {
  let data: any;
  const find = async () => {
    const id = (await props.params).id;
    if (id) {
      let temp = await formatByPrescription(id);
      return temp;
    }
  };

  data = await find();
  console.log(`data`);
  console.log(data);

  if (!data) {
    return (
      <div className="w-full min-h-[100dvh] max-w-[100dvw] select-none flex justify-center items-center">
        <a href="/" className="appearance-none text-red-600 p-2 underline">
          This prescription does not exist.
        </a>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] max-w-[100dvw] select-none flex justify-center items-center">
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
                value={data.prescription.name ? data.prescription.name : ""}
                // setValue={handleChange.name}
                placeholder="Name"
                label="Name"
                readonly
              />
            </div>
            <div className="tracking-widest">
              <TextBox
                value={data.customer?.phone}
                // setValue={handleChange.phone}
                placeholder="Phone"
                label="Phone"
                readonly
              />
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
            {new Date(data.prescription.date).toDateString()}
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
              <th
                className=" border-none border-gray-300 px-4 py-2"
                colSpan={4}
              >
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
                  // setValue={handleChange.distance.right.SPH}
                  value={data.prescription.prescription.distance.right.SPH}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.distance.right.CYL}
                  value={data.prescription.prescription.distance.right.CYL}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.distance.right.AXIS}
                  value={String(
                    data.prescription.prescription.distance?.right?.AXIS
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.distance.right.ADD}
                  value={String(
                    data.prescription?.prescription.distance?.right?.ADD
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.distance.left.SPH}
                  value={String(
                    data.prescription?.prescription.distance?.left?.SPH
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.distance.left.CYL}
                  value={String(
                    data.prescription?.prescription.distance?.left?.CYL
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.distance.left.AXIS}
                  value={String(
                    data.prescription?.prescription.distance?.left?.AXIS
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.distance.left.ADD}
                  value={String(
                    data.prescription?.prescription.distance?.left?.ADD
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
                  // setValue={handleChange.near.right.SPH}
                  type="number"
                  value={String(
                    data.prescription?.prescription.near?.right?.SPH
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  // setValue={handleChange.near.right.CYL}
                  type="number"
                  value={String(
                    data.prescription?.prescription.near?.right?.CYL
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.near.right.AXIS}
                  value={String(
                    data.prescription?.prescription.near?.right?.AXIS
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.near.right.ADD}
                  value={String(
                    data.prescription?.prescription.near?.right?.ADD
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.near.left.SPH}
                  value={String(
                    data.prescription?.prescription.near?.left?.SPH
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.near.left.CYL}
                  value={String(
                    data.prescription?.prescription.near?.left?.CYL
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.near.left.AXIS}
                  value={String(
                    data.prescription?.prescription.near?.left?.AXIS
                  )}
                />
              </td>
              <td className="border border-gray-300">
                <TextBox
                  textAlign="center"
                  type="number"
                  // setValue={handleChange.near.left.ADD}
                  value={String(
                    data.prescription?.prescription.near?.left?.ADD
                  )}
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
                  // setValue={(value: string) => handleChange.ipd(Number(value))}
                  value={String(data.prescription?.prescription.ipd)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2" colSpan={1}>
                Notes
              </td>
              <td className="border border-gray-300 px-4 py-2" colSpan={7}>
                <TextBox
                  // setValue={handleChange.note}
                  value={data.prescription?.prescription.note}
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
                  className="bg-zinc-900 text-white border-none border-gray-300 px-4 py-2"
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
                    // setValue={handleChange.distance.right.SPH}
                    value={String(
                      data.prescription?.prescription.distance?.right?.SPH
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    type="number"
                    textAlign="center"
                    // setValue={handleChange.distance.right.CYL}
                    value={String(
                      data.prescription?.prescription.distance?.right?.CYL
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    type="number"
                    textAlign="center"
                    // setValue={handleChange.distance.right.AXIS}
                    value={String(
                      data.prescription?.prescription.distance?.right?.AXIS
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    type="number"
                    textAlign="center"
                    // setValue={handleChange.distance.right.ADD}
                    value={String(
                      data.prescription?.prescription.distance?.right?.ADD
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
                    // setValue={handleChange.near.right.SPH}
                    type="number"
                    value={String(
                      data.prescription?.prescription.near?.right?.SPH
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.near.right.CYL}
                    value={String(
                      data.prescription?.prescription.near?.right?.CYL
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.near.right.AXIS}
                    value={String(
                      data.prescription?.prescription.near?.right?.AXIS
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.near.right.ADD}
                    value={String(
                      data.prescription?.prescription.near?.right?.ADD
                    )}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* LEFT */}
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead className="bg-white">
              <tr>
                <th
                  className="bg-zinc-900 text-white border-r border-gray-300 px-4 py-2"
                  colSpan={5}
                >
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
                    // setValue={handleChange.distance.left.SPH}
                    value={String(
                      data.prescription?.prescription.distance?.left?.SPH
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.distance.left.CYL}
                    value={String(
                      data.prescription?.prescription.distance?.left?.CYL
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.distance.left.AXIS}
                    value={String(
                      data.prescription?.prescription.distance?.left?.AXIS
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.distance.left.ADD}
                    value={String(
                      data.prescription?.prescription.distance?.left?.ADD
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
                    // setValue={handleChange.near.left.SPH}
                    value={String(
                      data.prescription?.prescription.near?.left?.SPH
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.near.left.CYL}
                    value={String(
                      data.prescription?.prescription.near?.left?.CYL
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.near.left.AXIS}
                    value={String(
                      data.prescription?.prescription.near?.left?.AXIS
                    )}
                  />
                </td>
                <td className="border border-gray-300">
                  <TextBox
                    textAlign="center"
                    type="number"
                    // setValue={handleChange.near.left.ADD}
                    value={String(
                      data.prescription?.prescription.near?.left?.ADD
                    )}
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
                // setValue={(value: string) => handleChange.ipd(Number(value))}
                value={String(data.prescription?.prescription.ipd)}
              />
            </div>
            <div className="">Notes</div>
            <div className="">
              <TextBox
                // setValue={handleChange.note}
                value={data.prescription?.prescription.note}
                className="border-amber-200 bg-yellow-50 rounded"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 w-full">
          <LensOptions data={data} />
        </div>

        <div className="flex justify-end items-center w-full mt-4 text-right absolute bottom-2 right-2">
          <div className="w-full sm:w-fit uppercase text-sm tracking-wide opacity-50">
            Booked by: {data.user.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

type LensOptionsProps = {
  data: any;
};
const LensOptions = (props: LensOptionsProps) => {
  let selectedValue = props.data.prescription.prescription.lens;

  return (
    <>
      <div className="font-bold my-2">Lens:</div>
      <div>{selectedValue}</div>
    </>
  );
};
