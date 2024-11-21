"use client";
import { SERVER_RESPONSE, serverActions } from "@/actions/serverActions";
import { prescription } from "@/actions/serverActions/Prescription";
import PrescriptionRow from "@/components/site/PrescriptionRow";
import Button from "@/components/ui/Button";
import { PRESCRIPTION_TYPE } from "@/models/Prescription";
import { ChevronLeft, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [session, setSession] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [sales, setSales] = useState<PRESCRIPTION_TYPE[] | null>(null);
  const router = useRouter();
  const validateFrontEndSession = async () => {
    const isValid = await serverActions.user.session.validateSession("token");
    if (isValid) {
      setSession(isValid);
    }
    setIsMounted(true);
  };

  useEffect(() => {
    validateFrontEndSession();
    fetchSales();
  }, []);

  const fetchSales = async () => {
    let dateBefore = new Date();
    dateBefore.setDate(dateBefore.getDate() - 1);
    const res: SERVER_RESPONSE = await serverActions.prescription.fromRange(
      new Date(dateBefore),
      new Date()
    );

    if (res.status === 200) {
      setSales(res.data);
    } else {
      setSales(null);
    }
  };

  if (!session && isMounted === false) {
    return (
      <div className="w-full min-h-[100dvh] max-h-[100dvh] flex justify-center items-center font-semibold text-zinc-600">
        Hold on...
      </div>
    );
  }

  if (!session && isMounted === true) {
    router.push(`/`);
    return (
      <div className="w-full min-h-[100dvh] max-h-[100dvh] flex justify-center items-center font-semibold text-red-500">
        You're not logged in yet to see that.
      </div>
    );
  }

  const handleLogout = async () => {
    await serverActions.user.logout("token");
    router.push(`/`);
  };

  return (
    <div className="w-full select-none min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-center items-center text-zinc-900 px-4">
      <div className="relative">
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
        <div className="border rounded p-2 w-full min-w-[320px] sm:w-[700px]">
          <div className="flex justify-between items-center bg-white p-2">
            <div className="flex gap-1 items-center">
              <UserCircle size={30} className="opacity-80" />
              <div>{session.name}</div>
            </div>
            <div className=" cursor-pointer">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
          {sales && (
            <div className="p-2 mt-2`">
              <div className="">
                {sales &&
                  sales.map((sale, index) => (
                    <div key={index}>
                      <PrescriptionRow
                        data={sale}
                        length={sales.length}
                        index={index}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
