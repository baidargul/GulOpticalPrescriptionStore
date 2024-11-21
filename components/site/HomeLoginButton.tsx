"use client";
import { serverActions } from "@/actions/serverActions";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const HomeLoginButton = (props: Props) => {
  const [session, setSession] = useState<any>(null);
  const validateFrontEndSession = async () => {
    const isValid = await serverActions.user.session.validateSession("token");
    if (isValid) {
      setSession(isValid);
    }
  };

  useEffect(() => {
    validateFrontEndSession();
  }, []);

  if (session) {
    return (
      <div className="p-2 px-4 flex gap-1 items-center text-nowrap sm:px-10 hover:bg-white cursor-pointer transition-all duration-300 rounded-md tracking-tighter hover:text-red-800">
        <CircleUser size={16} />
        {session.name}
      </div>
    );
  }

  return (
    <div>
      <Link href={"/login"}>
        <div className="p-2 px-4 flex gap-1 items-center text-nowrap sm:px-10 hover:bg-white cursor-pointer transition-all duration-300 rounded-md tracking-tighter hover:text-red-800">
          <CircleUser size={16} />
          Employee Login
        </div>
      </Link>
    </div>
  );
};

export default HomeLoginButton;
