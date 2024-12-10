"use client";
import { Copy } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const CopyLink = (props: Props) => {
  const handlecopyLink = async () => {
    const id = props.id;
    const link = `gul-optical-prescription-store.vercel.app/prescription/${id}`;
    let content = `Thank you for booking your glasses with us! We’re making it easier for you by storing your prescription on our cloud server with every order. You can access your records anytime and even save prescriptions for your family members.\n\nNo more worrying about keeping track of prescription cards!\n\n ہماری سروسز استعمال کرنے کا شکریہ! ہم آپ کے لیے آسانی پیدا کر رہے ہیں، ہر آرڈر کے ساتھ آپ کی نسخہ (پریسکرپشن) کو ہمارے کلاؤڈ سرور پر محفوظ کرتے ہیں۔ آپ کسی بھی وقت اپنی معلومات تک رسائی حاصل کر سکتے ہیں اور اپنے خاندان کے افراد کے نسخے بھی محفوظ کر سکتے ہیں۔ \n\nPrescription Link: \n${link}\n\n\nGul Opticals, Shaheed Road, Jhang. 03438793471`;
    navigator.clipboard.writeText(content);
  };

  return (
    <button onClick={handlecopyLink}>
      <div className="w-fit flex items-center gap-2 sm:w-fit text-sm tracking-wide py-1 bg-zinc-100 rounded-md p-1 hover:bg-zinc-50 border border-zinc-200 cursor-pointer">
        <Copy size={15} /> Copy
      </div>
    </button>
  );
};

export default CopyLink;
