import HomeLoginButton from "@/components/site/HomeLoginButton";
import { CircleUser, Notebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-[100dvh] max-h-[100dvh] overflow-hidden flex-col items-center justify-center p-24 select-none">
      <div>
        <Image
          src="/images/gul optical.png"
          width={200}
          height={200}
          alt="gul-opticals"
          className="min-w-24 min-h-16 w-24 h-16 sm:w-44 sm:h-28  max-w-44 max-h-28 pointer-events-none select-none"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm sm:text-base text-nowrap">
        <div className="font-semibold">
          Welcome to{" "}
          <span className="font-bold text-red-500">Gul Opticals, Jhang</span>
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-center items-center gap-4  sm:gap-2">
        <div className="text-xl  sm:text-2xl font-semibold text-red-800">
          What are you looking for?
        </div>
        <div className="flex justify-between items-center gap-4 sm:gap-2 bg-gradient-to-t from-zinc-200 to-zinc-100 border-b-4 border-zinc-700 rounded-t-md p-3 sm:p-5">
          <Link href={"/find"}>
            <div className="p-2 px-4 flex gap-1 items-center text-nowrap sm:px-10 hover:bg-white cursor-pointer transition-all duration-300 rounded-md tracking-tighter hover:text-red-800">
              <Notebook size={16} />
              Prescriptions
            </div>
          </Link>
          <HomeLoginButton />
        </div>
      </div>
      <div className="flex flex-col justify-start items-center px-32">
        <div className="text-xs scale-75 text-nowrap w-fit">
          This is just a tool we created, and will not act as website.
        </div>
        <div className="text-xs scale-75 text-nowrap w-fit -mt-1">
          Although we may introduct ecommerce solution in the future.
        </div>
        <div className="text-xs scale-75 text-nowrap w-fit -mt-1">
          <a
            href="https://wa.me/923438793471"
            className="flex gap-1 items-center"
          >
            <span className="font-bold">Any queries:</span>{" "}
            <span className="py-1 border-b border-green-100">
              📞+92 343 8793471
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
