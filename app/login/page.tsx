import Button from "@/components/ui/Button";
import TextBox from "@/components/ui/TextBox";
import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full min-h-[100dvh] bg-gradient-to-t from-red-100 to-red-50 flex justify-center items-center">
      <div className="bg-white rounded-lg border-b-4 border-red-200 min-w-[300px] sm:w-full max-w-[700px] grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-[1fr_auto] place-items-center gap-2 p-4 sm:p-10">
        <div className="mb-0 sm:mb-0">
          <Image
            src="/images/gul optical.png"
            width={200}
            height={200}
            alt="gul-opticals"
            className="min-w-24 min-h-16 w-24 h-16 sm:w-44 sm:h-28  max-w-44 max-h-28 pointer-events-none select-none"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="text-lg font-semibold text-red-700 tracking-wide">
            Login
          </div>
          <TextBox placeholder="Phone Number" type="number" label="Phone" />
          <TextBox placeholder="Password" type="password" label="Password" />
          <div className="w-full flex gap-1 items-end justify-between">
            <Button>Login</Button>
            <a className="text-red-700 text-sm text-nowrap px-5 cursor-pointer">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;