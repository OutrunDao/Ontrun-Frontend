"use client";

import { Button, Image, Link } from "@heroui/react";
import LiquidityDetailCard from "./LiquidityDetailCard";
import LiquidityDetailCardOwn from "./LiquidityDetailCardOwn";

export default function LiquidityDatail() {
  
  return (

<div className="relative min-h-[70rem] bg-no-repeat bg-cover bg-transparent flex flex-col items-center pt-20">
  <Button
    disableRipple
    href="/trade/liquidity"
    as={Link}
    className="absolute top-0 left-0 bg-transparent text-white text-[1.13rem] leading-[1.56rem] font-medium m-4"
    startContent={<Image alt="back" src="/images/back.svg" />}
  >
    Back
  </Button>
  <div
  className="relative w-[1318px] h-[373px] bg-no-repeat bg-cover bg-[url('/images/tokenLiquidityBG.png')] flex flex-col items-center gap-y-24 pt-[6.06rem]"
  >
    <LiquidityDetailCard />
</div>
  <div
  className="relative w-[1318px] h-[373px] bg-no-repeat bg-cover bg-[url('/images/tokenLiquidityBG.png')] flex flex-col items-center gap-y-24 pt-[6.06rem] mt-12"
  >
    <LiquidityDetailCardOwn />
  </div>
</div>
  )
}