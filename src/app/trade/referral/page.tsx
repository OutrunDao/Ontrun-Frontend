import ReferralContent from "@/components/trade/RefferContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral | Outrun",
};

export default function Referral() {
  return (
    <div className="h-[50rem] relative bg-[#0B0C1D] flex justify-center items-center">
      <img alt="background" src="/images/common-bg.svg" className="absolute top-0 left-0 bg-no-repeat z-0" />
      <div className="relative z-10">
        <ReferralContent />
      </div>
    </div>
  );
}
