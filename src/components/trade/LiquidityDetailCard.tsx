"use client";
import { useSwap, SwapView } from "@/hooks/useSwap";
import { Ether, Currency} from "@/packages/core";

import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useChainId } from "wagmi";
import AddLiquidityCard from "./AddLiquidityCard";

export const columns = [
  { key: "symbol", label: "" },
  { key: "value", label: "" },
]

export default function LiquidityDetailCard() {

  const {ownerLiquiditysData} = useSwap({view:SwapView.LiquidityTab});

  const chainId = useChainId();
  const searchParams = useSearchParams();
  const pairAddress = searchParams.get('pairAddress');
  const [selectedPosition,setSelectedPosition] = useState<any>(null);
  const [onOpen,setOnOpne] = useState(false);

  const data = useMemo(() => {
    if (!ownerLiquiditysData) return;
    for (let i = 0; i < ownerLiquiditysData.length; i++) {
      if (ownerLiquiditysData[i].address === pairAddress) {
        const _row = {
          tcl: ownerLiquiditysData[i].reserveUSD,
          token0: ownerLiquiditysData[i].token0,
          token1: ownerLiquiditysData[i].token1,
          reserve0: ownerLiquiditysData[i].reserve0,
          reserve1: ownerLiquiditysData[i].reserve1,
        }
        return _row;
      }
    }
  },[ownerLiquiditysData])

  function handleClosePopup() {
    setSelectedPosition(null);
    setOnOpne(false);
}

  function handleOpen() {
    setOnOpne(true);
  }
  

  return (
    
    <div className="absolute inset-0 flex flex-col items-start mt-10 px-20">
      <div className="flex justify-between items-center w-full">
        <span className="text-white text-[1.5rem]">Liquidity</span>
        <div className="flex space-x-4">
          <Button
            href="/trade/liquidity/addliquidity"
            className="rounded-[5.63rem] bg-transparent text-white text-[1.13rem] leading-[1.56rem] font-medium w-[10.75rem] h-[2.63rem] border-solid border-[0.06rem] border-white"
            startContent={<span className="text-[1.13rem] font-medium">+</span>}
            onClick={() => handleOpen()}
          >
            Add Liquidity
          </Button>
          <Button
            className="rounded-[5.63rem] bg-transparent text-white text-[1.13rem] leading-[1.56rem] font-medium w-[10.75rem] h-[2.63rem] border-solid border-[0.06rem] border-white"
          >
            Remove liquidity
          </Button>
        </div>
      </div>
      <span className="text-white text-[1rem] mt-14">{data?.tcl} USD</span>
      <div className="bg-[#170e26FF] w-full text-white p-4 px-8 mt-14">
        <div className="flex justify-between">
          <span>{data?.token0.symbol}</span>
          <span className="ml-auto pr-4">{data?.reserve0}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>{data?.token1.symbol}</span>
          <span className="ml-auto pr-4">{data?.reserve1}</span>
        </div>
      </div>
      {onOpen &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
          <AddLiquidityCard isBack={true} _token0={data?.token0} _token1={data?.token1}/>
          <Button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-white border-transparent"
              variant="ghost"
              aria-label="Close"
          >
              <X className="h-6 w-6" />
          </Button>
          </div>
      </div>
      }

                            
    </div>
    
  )
}