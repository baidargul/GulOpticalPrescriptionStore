import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full min-h-[100dvh] max-w-[100dvw] select-none flex justify-center items-center sm:p-10">
      <div className="relative">
        <div className="bg-white w-full p-6 rounded-lg shadow-md scale-90 sm:scale-100 relative">
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
          <div>
            <div>
              <div className="text-xl">Privacy Policy</div>
            </div>
            <div>
              <div className="text-sm">
                <main className="container mx-auto px-4 py-6">
                  <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                    <p>
                      At <span className="font-bold">Gul Opticals</span>, we are
                      committed to protecting your privacy. This Privacy Policy
                      explains how we collect, use, and safeguard your
                      information when you use our Tool.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                      Information We Collect
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-bold">Name:</span> To identify
                        customers.
                      </li>
                      <li>
                        <span className="font-bold">Phone Number:</span> Used
                        for customer identification and accessing prescriptions.
                      </li>
                      <li>
                        <span className="font-bold">Prescription Data:</span>{" "}
                        Includes customer-specific prescription details.
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                      How We Use Your Information
                    </h2>
                    <p className="mb-4">
                      We use your information in the following ways:
                    </p>
                    <div className="mb-4">
                      <h3 className="font-semibold">
                        1. Name and Phone Number:
                      </h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          Admins have unrestricted access to phone numbers for
                          operational and administrative purposes.
                        </li>
                        <li>
                          Employees can view phone numbers only during the
                          booking and data collection process. After data
                          submission, phone numbers are masked, leaving only the
                          first three and last four digits visible for internal
                          order processing and operations.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">2. Prescription Data:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          Prescriptions are securely stored and can be accessed
                          using the associated phone number or a unique
                          prescription ID.
                        </li>
                        <li>
                          Employees can view prescriptions only on the booking
                          day. After this period, they must use the customer’s
                          phone number or prescription ID to access data.
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                      Prescription Sharing
                    </h2>
                    <p>
                      Prescriptions can be shared securely through a link
                      containing the unique prescription ID. This ID is designed
                      to be difficult to obtain without the associated phone
                      number, ensuring enhanced security for customer data.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                    <p>
                      If you have any questions about this Privacy Policy,
                      please contact us at{" "}
                      <a
                        href="mailto:baidargul@outlook.com"
                        className="text-red-600 underline"
                      >
                        baidargul@outlook.com
                      </a>
                      {" | "}{" "}
                      <a
                        href={`https://wa.me/923438793471`}
                        className="text-red-600 underline"
                      >
                        +923438793471
                      </a>
                    </p>
                  </section>
                </main>
              </div>
              <div className="text-sm">
                This privacy policy has been compiled to better serve those who
                choose to use our tool. This policy is effective as of{" "}
                {new Date().toDateString()}.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
