"use client";
import { SERVER_RESPONSE, serverActions } from "@/actions/serverActions";
import Button from "@/components/ui/Button";
import TextBox from "@/components/ui/TextBox";
import { USER_TYPE } from "@/models/Users";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("03");
  const [password, setPassword] = useState<string>("");

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  const handleSignUp = async () => {
    const user: USER_TYPE = {
      name,
      phone,
      password,
      active: true,
      isAdmin: false,
    };

    const response: SERVER_RESPONSE = await serverActions.user.create(user);
    if (response.status === 200) {
      setMode("login");
    }
  };

  const handleLogin = async () => {
    if (!phone || !password) return;
    const response: SERVER_RESPONSE = await serverActions.user.login(
      phone,
      password
    );
    console.log(response);
    if (response.status === 200) {
      setMode("register");
    }
  };

  return (
    <div className="w-full min-h-[100dvh] select-none overflow-hidden bg-gradient-to-t from-black via-red-900 to-black flex justify-center items-center">
      <div className="relative">
        <div
          title="Goto Home"
          className="absolute -top-4 -left-4 cursor-pointer z-10 p-2 bg-white hover:bg-red-500 group rounded-full border border-red-400 drop-shadow-sm"
        >
          <Link href={"/"}>
            <ChevronLeft
              size={20}
              className="text-red-700  group-hover:text-white hover:rotate-0 rotate-45 transition-all duration-500"
            />
          </Link>
        </div>
        <div className="bg-white rounded-lg min-w-[280px] sm:w-full max-w-[700px] grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-[1fr_auto] place-items-center sm:gap-2 p-4 sm:p-10">
          <div className="mb-0 sm:mb-0 flex flex-col gap-1 items-center">
            <Image
              src="/images/gul optical.png"
              width={200}
              height={200}
              alt="gul-opticals"
              className="min-w-24 min-h-16 w-24 h-16 pr-0 sm:pr-2 sm:w-44 sm:h-28  max-w-44 max-h-28 pointer-events-none select-none"
            />
            <span className="text-red-600 tracking-wide text-sm sm:text-base">
              Shaheed Road, Jhang
            </span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="text-lg font-semibold text-red-700 tracking-wide">
              {mode === "login" ? "Login" : "Register yourself"}
            </div>
            {mode === "register" && (
              <TextBox
                placeholder="Firstname Lastname"
                type="text"
                label="Name"
                value={name}
                setValue={setName}
              />
            )}
            <TextBox
              placeholder="Phone Number"
              type="number"
              label="Phone"
              value={phone}
              setValue={setPhone}
            />
            <TextBox
              placeholder="Password"
              type="password"
              label="Password"
              value={password}
              setValue={setPassword}
            />
            <div className="w-full flex gap-1 items-end justify-between">
              <Button
                onClick={() =>
                  mode === "login" ? handleLogin() : handleSignUp()
                }
              >
                {mode === "login" ? "Login" : "Signup"}
              </Button>
              <a
                onClick={toggleMode}
                className="text-red-700 text-sm text-nowrap px-5 cursor-pointer"
              >
                {mode === "login" ? "Create an account" : "Have account?"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
