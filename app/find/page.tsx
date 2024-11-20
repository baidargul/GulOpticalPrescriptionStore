"use client";
import { SERVER_RESPONSE, serverActions } from "@/actions/serverActions";
import { ChevronLeft, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [phone, setPhone] = useState("03");
  const [rows, setRows] = useState<any>([]);
  const phoneRef: any = useRef(null);
  const router = useRouter();

  const handleFocus = () => {
    phoneRef.current.select();
  };

  const handleNumberChange = (e: any) => {
    setPhone(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const res: SERVER_RESPONSE = await serverActions.customer.list(phone);
    console.log(res);
    if (res.status === 200) {
      setRows(res.data);
    } else {
      setRows([]);
    }
  };

  return (
    <div className="min-h-[100dvh] overflow-hidden w-full  grid grid-cols-1 grid-rows-[1fr_auto] pt-10 sm:pt-0 gap-4 sm:gap-0 sm:grid-rows-1 sm:grid-cols-[1fr_auto] justify-items-center place-items-center">
      <style>
        {`/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fffaea;
  padding: 12px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #52525B;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #F13037;
}`}
      </style>
      <div className="relative">
        <div
          title="Goto Home"
          className="absolute -top-4 -left-4 cursor-pointer z-10 p-2 bg-white hover:bg-red-500 group rounded-full border"
        >
          <Link href={"/"}>
            <ChevronLeft
              size={20}
              className="text-zinc-500 group-hover:text-white rotate-45"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-gradient-to-t from-zinc-100 to-zinc-50 p-4 sm:p-10 rounded border border-zinc-300 drop-shadow-sm">
            <div className="min-w-[280px] text-2xl sm:text-4xl font-bold flex justify-between items-center text-zinc-600">
              <div>
                <div>Gul Opticals</div>
                <div className="text-sm tracking-wide -mt-1">
                  Shaheed road, Jhang
                </div>
              </div>
              <Image
                src="/images/gul optical.png"
                width={200}
                height={200}
                alt="gul-opticals"
                className="w-14 h-10  sm:w-44 sm:h-28 pointer-events-none select-none"
              />
            </div>
            <div className="mt-4">
              <div className="font-semibold text-sm sm:text-lg tracking-wider text-black/80 mb-1">
                Customer phone:
              </div>
              <div>
                <input
                  value={phone}
                  ref={phoneRef}
                  onChange={handleNumberChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  className="appearance-none w-full focus:tracking-wider transition-all duration-500 text-md sm:text-4xl border border-zinc-600 selection:bg-zinc-200 selection:text-zinc-600 text-black/80 rounded outline-none ring-0 p-2 text-center font-bold"
                />
              </div>
              <div className="flex justify-end gap-2 items-center mt-5">
                {phone && phone.length === 11 && (
                  <a href={`/prescription/add/${phone}`}>
                    <button className="p-2 px-6 flex gap-1 items-center sm:px-10 rounded-md bg-zinc-100 hover:bg-zinc-50 text-zinc-900 font-bold text-sm sm:text-lg tracking-wider border border-zinc-600">
                      <Plus size={20} />
                      Add
                    </button>
                  </a>
                )}
                <button
                  onClick={handleSubmit}
                  className="p-2 px-6 sm:px-10  flex gap-1 items-center rounded-md bg-zinc-100 hover:bg-zinc-50 text-zinc-900 font-bold text-sm sm:text-lg tracking-wider border border-zinc-600"
                >
                  <Search size={20} />
                  Find
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {rows && rows?.prescriptions?.length > 0 && (
        <div className="bg-zinc-100 max-h-[100dvh]  border-t-2 sm:border-l-2 border-zinc-300 min-h-[100dvh] w-full sm:w-[500px] p-4 overflow-y-auto">
          <div className="mb-4 sm:mb-10 text-lg ">
            <div className="flex flex-col sm:flex-row gap-1 items-center justify-between">
              <div className="font-bold text-black/80 text-xl sm:text-4xl tracking-wide">
                {rows[0]?.customer?.name}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <div className="">Available records:</div>
                <div>{rows.prescriptions.length}</div>
              </div>
            </div>
          </div>
          <table className="w-full border border-zinc-600 bg-white/40">
            <thead>
              <tr className="">
                <th className="font-semibold text-left bg-zinc-600 text-white py-2 pl-1"></th>
                <th className="font-semibold text-left bg-zinc-600 text-white py-2 pl-1">
                  Name
                </th>
                <th className="font-semibold text-left bg-zinc-600 text-white py-2 pl-1 hidden sm:block">
                  Phone
                </th>
                <th className="font-semibold text-right bg-zinc-600 text-white py-2 pr-2 ">
                  Last active
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.prescriptions.map((row: any, index: number) => {
                return (
                  <tr
                    key={index}
                    onClick={(e: any) => {
                      router.push(`/prescription/${row._id}`);
                    }}
                    className={` w-full even:bg-zinc-200/40 cursor-pointer ${
                      index === 0 ? "border-y" : "border-b"
                    } border-zinc-600`}
                  >
                    <td className="py-2 pl-1 text-sm">
                      <div>
                        <div className="hidden sm:block">{index + 1} -</div>
                        <div className="sm:hidden text-xs">{index + 1}</div>
                      </div>
                    </td>
                    <td className="py-2 pl-1 text-sm">
                      <div>
                        <div className="hidden sm:block">{row.name}</div>
                        <div className="sm:hidden text-xs">{row.name}</div>
                      </div>
                    </td>
                    <td className="py-2 pl-1 text-sm hidden sm:block">
                      <div>
                        <div className="hidden sm:block">
                          {rows.customer.phone}
                        </div>
                        <div className="sm:hidden text-xs">
                          {rows.customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 pr-2 text-sm text-right">
                      <div>
                        <div className="hidden sm:block">
                          {" "}
                          {new Date(row.date).toDateString()} -{" "}
                          {new Date(row.date).toLocaleTimeString()}
                        </div>
                        <div className="sm:hidden text-xs">
                          {" "}
                          {new Date(row.date).toDateString()} -{" "}
                          {new Date(row.date).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
