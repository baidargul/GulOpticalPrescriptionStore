import { serverActions } from "@/actions/serverActions";
import EyeGlassesPrescriptionTable from "@/components/EyeGlassesPrescriptionTable";
import { connectMongo } from "@/lib/mongo";
import { Customer, CUSTOMER_TYPE } from "@/models/Customer";

type Props = {
  params: Promise<{ phone: string }>;
};

export const generateStaticParams = async () => {
  await connectMongo();
  const customers = await Customer.find({}).lean();

  return customers.map((customer) => ({
    phone: customer.phone,
  }));
};

const page = async (props: Props) => {
  const phone = (await props.params).phone;

  return (
    <div className="w-full max-h-[100dvh] min-h-[100dvh] bg-amber-400 flex justify-center items-center">
      <div className="w-full">
        <EyeGlassesPrescriptionTable phone={phone} />
      </div>
    </div>
  );
};

export default page;
