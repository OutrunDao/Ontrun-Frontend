import { liquidityTableColumns } from "@/constants";
import {
  getKeyValue,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import PaginationCustom from "../PaginationCustom";
import { SwapView, useSwap } from "@/hooks/useSwap";
import { useState, useEffect, useMemo } from "react";
import { usePair } from "@/contracts/useContract/usePair";
import { Address } from "viem";

interface LiquidityTabProps {
  symbol: string;
}

export default function LiquidityTab({symbol}: LiquidityTabProps) {
  const {allPairsData,ownerLiquiditysData} = useSwap({view:SwapView.LiquidityTab});
  const searchHandler = (value: string) => {};
  const [rows , setRows] = useState<any[] | undefined>([]);

  const allRows = useMemo(() => {
    if (!allPairsData) return;
      let _row:any[] = []
      for (let i = 0; i < allPairsData.length; i++) {
        _row.push({
          id: i.toString(), 
          pool: `${allPairsData[i].token0.symbol}/${allPairsData[i].token1.symbol}`,
          volume: allPairsData[i].address,
        
        })
      }
      return _row;
  },[allPairsData])

  const ownerRows = useMemo(() => {
    if (!ownerLiquiditysData) return;
      let _row:any[] = []
      for (let i = 0; i < ownerLiquiditysData.length; i++) {
        _row.push({
          id: i.toString(), 
          pool: `${ownerLiquiditysData[i].token0.symbol}/${ownerLiquiditysData[i].token1.symbol}`,
          volume: ownerLiquiditysData[i].address,
        
        })
      }
      return _row;
  },[ownerLiquiditysData])

  useEffect(() => {
    if(symbol === "All"){
      setRows(allRows)
    } else if(symbol === "Owner"){
      setRows(ownerRows)
    }
  },[symbol,allRows]) 

  return (
    <div className="flex flex-col gap-y-12 items-center justify-center">
      <div className="bg-no-repeat bg-cover bg-[url('/images/liquidity-tab.png')] w-[82.47rem] h-[56.30rem]">
        <div className="w-full my-[1.69rem] mx-[2.06rem] flex justify-between">
          <Input
            placeholder="Search by Name, Symbol or Address"
            onValueChange={(value) => {
              searchHandler(value);
            }}
            classNames={{
              base: "rounded-[1.88rem] h-[2.5rem] text-white font-normal text-[0.88rem] leading-[1.25rem] font-verdana border-[0.03rem] border-[#504360] hover:bg-[#201937] bg-[#201937] w-[40.31rem]",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte font-black",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
            }}
            startContent={<Image alt="search" src="/images/search.svg" />}
          />
        </div>
        <Table
          removeWrapper
          classNames={{
            th: "bg-transparent text-center border-b border-divider border-[#4A325D] border-opacity-[0.3]",
            tr: "border-divider border-[#4A325D] border-opacity-[0.3] outline-2",
            td: "text-center text-white",
          }}>
          <TableHeader columns={liquidityTableColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          {rows && rows.length > 0 ? (
          <TableBody items={rows} emptyContent={"No data"}>
            {(item) => (
              <TableRow key={item.id}>
                {/* <TableCell>{item.id}</TableCell>
                <TableCell>{item.pool}</TableCell> */}

                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
            )}
          </TableBody>):(
            <TableBody >
              <TableRow key="1">
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      <PaginationCustom total={10} currentPage={1} pageSize={10} setCurrentPage={() => {}} />
      {/* <span>{allPairs}</span> */}
    </div>
  );
}
