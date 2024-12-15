import CreateMemeverseCard from "@/components/memeverse/CreateMemeverseCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Memeverse | Outrun",
};

export default function CreateMemeverse() {
  return (
    <div className="min-h-[70rem] bg-no-repeat bg-cover bg-[url('/images/common-bg.svg')] flex items-center justify-center pt-32">
      <CreateMemeverseCard />
    </div>
  );
}
