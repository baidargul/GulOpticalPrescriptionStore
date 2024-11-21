"use client";
import { serverActions } from "@/actions/serverActions";
import Button from "@/components/ui/Button";
import { UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [session, setSession] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
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
  }, []);

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
    <div className="w-full select-none min-h-[100dvh] max-h-[100dvh] flex flex-col justify-center items-center text-zinc-900">
      <div className="border rounded p-2">
        <div className="flex justify-between items-center bg-white p-2 border-b rounded-t w-[700px]">
          <div className="flex gap-1 items-center">
            <UserCircle size={30} className="opacity-80" />
            <div>{session.name}</div>
          </div>
          <div className=" cursor-pointer">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
