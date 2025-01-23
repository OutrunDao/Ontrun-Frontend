import { ReferralTableColumns } from "@/constants";
import { SwapView, useSwap } from "@/hooks/useSwap"
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
import { Tooltip } from 'react-tooltip'
import PaginationCustom from "../PaginationCustom";
import { useState, useEffect, useMemo, Key } from "react";

export function RefferCard() {

  const {referData} = useSwap({
    view: SwapView.Referral
  })

  const referalRows = useMemo(() => {
    if (!referData) return;
    const transactions = referData.referalTransactions;
    let _row:any[] = [];
    for (let i = 0; i < transactions.length; i++) {
      let _router:any[] = [];
      let _amount:any[] = [];
      // push router,amount
      for (let j = 0; j < transactions[i].protocolFees.length; j++) {
        if (j == 0) {
          if (transactions[i].protocolFees[j].protocolFee0 != 0) {
            _router.push(transactions[i].protocolFees[j].pair.token0.symbol);
            _router.push(transactions[i].protocolFees[j].pair.token1.symbol);
            _amount.push(transactions[i].protocolFees[j].rebateFee0);
          } else {
            _router.push(transactions[i].protocolFees[j].pair.token1.symbol);
            _router.push(transactions[i].protocolFees[j].pair.token0.symbol);
            _amount.push(transactions[i].protocolFees[j].rebateFee1);
          }
        } else {
          if (transactions[i].protocolFees[j].protocolFee0 != 0) {
            _router.push(transactions[i].protocolFees[j].pair.token1.symbol);
            _amount.push(transactions[i].protocolFees[j].rebateFee0);
          } else {
            _router.push(transactions[i].protocolFees[j].pair.token0.symbol);
            _amount.push(transactions[i].protocolFees[j].rebateFee1);
          }
        }
      }
      let router;
      let amount;
      // create router,amount
      for (let j = 0; j < _router.length; j++) {
        if (j == 0) {
          router = `${_router[j]}`;
        } else {
          router += `->${_router[j]}`;
        }

        if (j == 0) {
          amount = `${Number(_amount[j]).toFixed(18).replace(/\.?0+$/, '')} ${_router[j]}`;
        } else if (j == _router.length-1) {
          continue;
        } else {
          amount += `,${Number(_amount[j]).toFixed(18).replace(/\.?0+$/, '')} ${_router[j]}`;
        }
        
      }
      // Convert timestamp to YYYY-MM-DD format
      const date = new Date(transactions[i].timestamp * 1000); // Assuming timestamp is in seconds
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      
      _row.push({
        id: transactions[i].id,
        router: router,
        _router: _router,
        amount: amount,
        _amount: _amount,
        account: transactions[i].swaps[0].from,
        time: formattedDate,
      })
    }
    return _row;
  },[referData])

  function getRows(item: any, key: Key) {
    switch (key) {
      case "router":
        return (
          <div>
            <a 
              href={`https://testnet.bscscan.com/tx/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              {item.router}
            </a>
          </div>
        )
      case "amount":
        return item.amount;

        // return (
        //   <div>
        //     <span className="my-anchor-element">{item.amount.toFixed(2)}</span>
        //     <Tooltip
        //       anchorSelect=".my-anchor-element"
        //       content={item.amount.toFixed(18)}
        //     />
        //   </div>
        // )
      case "account":
        return item.account;
      case "time": 
        return item.time;
    }
  }
  
  return (
    <div className="mt-[2.94rem] w-full relative">
      <div className="w-[70rem] h-[14rem] bg-no-repeat bg-contain bg-[url('/images/refferDataBG.png')] flex flex-col gap-y-24 pt-[3rem]">
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start ml-[10rem]">
            <div className="flex items-center">
              <img src="/images/refer-person-icon.png" alt="refferDataIcon" className="w-8 h-8 mr-2" />
              <span className="text-white font-verdana font-bold text-[1rem]">
                Number of Guests
              </span>
            </div>
            <span className="text-white font-verdana font-bold text-[1.5rem] self-center mt-10">
              {referData?.referCount || 0}
            </span>
          </div>
          <div className="flex flex-col items-start mr-[10rem]">
            <div className="flex items-center">
              <img src="/images/refer-price-icon.png" alt="refferDataIcon" className="w-8 h-8 mr-2" />
              <span className="text-white font-verdana font-bold text-[1rem]">
                Gross commission
              </span>
            </div>
            <span className="my-anchor-element text-white font-verdana font-bold text-[1.5rem] self-center mt-10">
              {referData?.totalRebateFeeUSD.toFixed(2) || 0} $
            </span>
            <Tooltip
                anchorSelect=".my-anchor-element"
                content={referData?.totalRebateFeeUSD?.toFixed(18).replace(/\.?0+$/, '')}
            />
          </div>
        </div>
      </div>
      <div className="w-[70rem] mt-[2.94rem]">
        <span className="text-[1.5rem] text-white">Rebate historical data</span>
      </div>
      <div className="flex flex-col gap-y-12 items-center justify-center">
        <div className="mt-[1rem] bg-no-repeat bg-contain bg-[#1b1226FF] border-[#4a385fFF] border-2 w-[70rem] h-[56.30rem]">
        <Table
            removeWrapper
            classNames={{
              th: "bg-transparent text-left border-b border-divider border-[#4A325D] border-opacity-[0.3] py-4",
              tr: "border-divider border-[#4A325D] border-opacity-[0.3] outline-2 py-4",
              td: "text-left text-white py-4",
            }}>
            <TableHeader columns={ReferralTableColumns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            {referalRows && referalRows.length > 0 ? (
            <TableBody items={referalRows} emptyContent={"No data"}>
              {(item) => (
                <TableRow key={item.id}>
                  {/* <TableCell>{item.id}</TableCell>
                  <TableCell>{item.pool}</TableCell> */}

                  {(columnKey) => <TableCell>{getRows(item, columnKey)}</TableCell>}
                  </TableRow>
              )}
            </TableBody>):(
            <TableBody emptyContent={"None Yet."}>{[]}</TableBody>

            )}
          </Table>
        </div>
        <PaginationCustom total={10} currentPage={1} pageSize={10} setCurrentPage={() => {}} />
        {/* <span>{allPairs}</span> */}
      </div>
    </div>
  )
}