
import ReferralContent from "@/components/trade/RefferContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral | Outrun",
};

export default function Referral() {
  return (
    <div className="h-[125rem] relative bg-[#0B0C1D]">
      <img alt="background" src="/images/common-bg.svg" className="absolute top-0 left-0 bg-no-repeat z-0" />
      <div className="absolute z-10 top-[14rem] left-[16rem]">
        <ReferralContent />
      </div>
    </div>
  );
}
