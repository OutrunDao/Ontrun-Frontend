import MemeverseContent from "@/components/memeverse/MemeverseContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memeverse | Outrun",
};

export default function Memeverse() {
  return (
    <div className="h-[125rem] relative bg-[#0B0C1D] flex justify-center">
      <img alt="background" src="/images/common-bg.svg" className="absolute top-0 left-0 bg-no-repeat z-0" />
      <div className="relative z-10" style={{ marginTop: '100px' }}>
        <MemeverseContent />
      </div>
    </div>
  );
}
