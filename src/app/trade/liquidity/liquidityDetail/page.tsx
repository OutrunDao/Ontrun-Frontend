import type { Metadata } from "next";
import { Suspense } from "react";
import LiquidityDetail from "@/components/trade/LiquidityDetail";

export const metadata: Metadata = {
  title: "Liquidity Details | Outrun",
};

export default function liquidityDetail() {
  return (
    <div className="min-h-[70rem] bg-no-repeat bg-cover bg-[url('/images/liquidityDetailBG.png')] flex items-center justify-center pt-32">
      <Suspense fallback={<div>Loading...</div>}>
        <LiquidityDetail />
      </Suspense>
    </div>
  );
}
