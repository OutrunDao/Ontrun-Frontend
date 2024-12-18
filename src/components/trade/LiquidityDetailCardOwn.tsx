"use client";
import { useSwap, SwapView } from "@/hooks/useSwap";
import { Ether, Currency} from "@/packages/core";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useChainId } from "wagmi";

export const columns = [
  { key: "symbol", label: "" },
  { key: "value", label: "" },
]

export default function LiquidityDetailCard() {

  const {allPairsData,ownerLiquiditysData} = useSwap({view:SwapView.LiquidityTab});

  const chainId = useChainId();
  const searchParams = useSearchParams();
  const pairAddress = searchParams.get('pairAddress');

  const data = useMemo(() => {
    if (!ownerLiquiditysData||!allPairsData) return;
    let _row:any = {}
    for (let i = 0; i < ownerLiquiditysData.length; i++) {
      if (ownerLiquiditysData[i].address === pairAddress) {
        _row = {
          tcl: ownerLiquiditysData[i].reserveUSD,
          token0: ownerLiquiditysData[i].token0.symbol,
          token1: ownerLiquiditysData[i].token1.symbol,
          reserve0: 0,
          reserve1: 0,
        }
        console.log(_row)
        return _row;
      }
    }
    if (!_row.token0) {
      for (let i = 0; i < allPairsData.length; i++) {
        if (allPairsData[i].address === pairAddress) {
          _row = {
            tcl: allPairsData[i].reserveUSD,
            token0: allPairsData[i].token0.symbol,
            token1: allPairsData[i].token1.symbol,
            reserve0: 0,
            reserve1: 0,
          }
          console.log(_row)
          return _row;
        }
      }
    }
  },[ownerLiquiditysData,allPairsData])
  

  return (
    <div className="absolute inset-0 flex flex-col items-start mt-10 px-20">
      <div className="flex justify-between items-center w-full">
        <span className="text-white text-[1.5rem]">Fees</span>
      </div>
      <span className="text-white text-[1rem] mt-14">{"-"}</span>
      <div className="bg-[#170e26FF] w-full text-white p-4 px-8 mt-14">
        <div className="flex justify-between">
          <span>{data?.token0}</span>
          <span className="ml-auto pr-4">{data?.reserve0}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>{data?.token1}</span>
          <span className="ml-auto pr-4">{data?.reserve1}</span>
        </div>
      </div>

    </div>
  )
}