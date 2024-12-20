import { liquidityTableColumns } from "@/constants";
import {
  Button,
  getKeyValue,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import PaginationCustom from "../PaginationCustom";
import { SwapView, useSwap } from "@/hooks/useSwap";
import { useState, useEffect, useMemo, Key } from "react";
import { usePair } from "@/contracts/useContract/usePair";
import { Address } from "viem";

export default function OwnerLiquidityTab() {
  const {ownerLiquiditysData} = useSwap({view:SwapView.LiquidityTab});
  const searchHandler = (value: string) => {};
  const [rows , setRows] = useState<any[] | undefined>([]);

  const ownerRows = useMemo(() => {
    if (!ownerLiquiditysData) return;
    let _row:any[] = []
    for (let i = 0; i < ownerLiquiditysData.length; i++) {
      _row.push({
        id: i.toString(), 
        pool: `${ownerLiquiditysData[i].token0Symbol}/${ownerLiquiditysData[i].token1Symbol}`,
        feeRate: `${ownerLiquiditysData[i].fee.toFixed(6).replace(/\.?0+$/, '')}%`,
        volume: `${ownerLiquiditysData[i].volumeUSD.toFixed(6).replace(/\.?0+$/, '')} $`,
        tcl: `${ownerLiquiditysData[i].reserveUSD.toFixed(6).replace(/\.?0+$/, '')} $`,
        fees: `${Number(ownerLiquiditysData[i].fee * ownerLiquiditysData[i].volumeUSD).toFixed(6).replace(/\.?0+$/, '')} $`,
        address: ownerLiquiditysData[i].address
      
      })
    }
    return _row;
  },[ownerLiquiditysData])

  function handleDetail(address: Address) {
    window.location.href = '/trade/liquidity/liquidityDetail?pairAddress=' + address;
  }

  function getRows(item: any, key: Key) {
    switch (key) {
      case "id":
        return item.id;
      case "pool":
        return item.pool;
      case "feeRate":
        return item.feeRate;
      case "volume":
        return item.volume;
      case "tcl": 
        return item.tcl;
      case "fees":
        return item.fees;
      case "action":
        return (
          <div>
            <Button 
              className="text-white text-[0.82rem] font-avenir leading-[1.12rem] rounded-full font-normal text-opacity-50 bg-transparent border-solid border-[0.06rem] border-opacity-30 h-[1.34rem] hover:bg-gray-200 hover:text-black"
              onClick={() => handleDetail(item.address)}
            >
              Detail
            </Button>
          </div>
        )
  }
}

  useEffect(() => {
    setRows(ownerRows);
  },[ownerLiquiditysData])

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

                {(columnKey) => <TableCell>{getRows(item, columnKey)}</TableCell>}
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
