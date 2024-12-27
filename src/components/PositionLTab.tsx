import { Button } from "@/components/ui/button"
import { useAccount, useChainId } from "wagmi";
import { getTokensByChainId } from "@/contracts/tokens/tokenStake";
import { StakeCurrencyListMap } from "@/contracts/currencys";
import { Fragment, Key, useEffect, useMemo, useState } from "react";
import { POT } from "@/contracts/tokens/POT";
import { usePOT } from "@/contracts/useContract/usePOT";
import { ethers } from "ethers";
import Decimal from "decimal.js-light";
import RedeemTab from "./RedeemTab";
import { all, chain, iterate, set } from "radash";
import { X } from 'lucide-react'
import RedeemCard from "./RedeemCard";
import Position from "@/app/staking/position/page";
import { useYT } from "@/contracts/useContract/useYT";
import { Accordion, AccordionItem, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue} from "@nextui-org/react";
import { positionTableColumns } from "@/constants";
import { Currency, Token } from "@/packages/core";

function unixTimestampToYMDHMS(timestamp: number) {
    const date = new Date(timestamp * 1000); // 将秒转换为毫秒
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，需要加1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}:${month}:${day}:${hours}:${minutes}:${seconds}`;
}

export default function PositionLTab() {

    const chainId = useChainId();
    const account = useAccount();

    const tokensOnChain = useMemo(() => getTokensByChainId(chainId), [chainId]);
    const [tablesDatas,setTablesDatas] = useState<any[]>();
    const [positionsDatas,setPositionsDatas] = useState<any[]>();
    const [POTs,setPOTs] = useState<POT[]>();
    const [selectedPosition,setSelectedPosition] = useState<any>(null);
    const [RTSymbol,setRTSymbol] = useState("");
    const [onOpen,setOnOpne] = useState(false);

    const UsePOT = usePOT();
    const UseYT = useYT();

    useEffect(() => {
        async function _() {
            const _POTs = [];
            for (let i = 0; i < tokensOnChain.length; i++) {
                const token = tokensOnChain[i];
                if (token.symbol) {
                    const POT = StakeCurrencyListMap[chainId][token.symbol].POT[chainId];
                    _POTs.push(POT);
                }
            }
            return _POTs;
        }
        _().then(setPOTs);

    },[chainId,tokensOnChain]);

    useEffect(() => {
        async function _() {
            const _positionsDatas = [];
            if (!POTs || !account.address) return;
            for (let i = 0; i < POTs.length; i++) {
                const _positionDatas = [];
                const allPOT = await UsePOT.POTRead.getAllPOT(POTs[i],account.address);
                const result = await UsePOT.POTRead.positions(POTs[i],account.address);
                const currentRealRate = await UseYT.YTView.currentRealRate((POTs[i].YT as Token).address);
                if (!result) return;
                for (let j = 0; j < result.length; j++) {
                    const POTBalance = new Decimal(ethers.formatEther(allPOT[j].value || "0"));
                    const PositionId = allPOT[j].tokenId.toString();

                    const res = await UsePOT.POTRead.previewRedeem({POT:POTs[i],positionId:PositionId,positionShare:result[j][2]});

                    const principalRedeemable = new Decimal(ethers.formatEther(res || "0"));
                    const deadline = unixTimestampToYMDHMS(Number(result[j][3]));
                    const _positionData = {
                        name: POTs[i].symbol,
                        principalRedeemable:principalRedeemable,
                        currentRealRate: currentRealRate,
                        deadline:deadline,
                        RTSymbol:POTs[i].RTSymbol,
                        POTBalance:POTBalance,
                        PositionId:PositionId,
                    }
                    _positionDatas.push(_positionData);
                }
                _positionsDatas.push(_positionDatas);
            }
            return _positionsDatas;
        }
        _().then(setPositionsDatas);
    },[POTs]);

    function getTableData(item:any,key:Key) {
        switch (key) {
            case "name":
                return item.name;
            case "principalRedeemable":
                return (<div><span>{item.principalRedeemable.toFixed(6)} {item.RTSymbol}</span></div>);
            case "rate":
                return (<div><span>{item.currentRealRate.toFixed(2)}%</span></div>);
            case "unlockTime": 
                return (<div><span>{item.deadline}</span></div>);
            case "action":
                return (
                    <div>
                        <Button 
                            className="text-white text-[0.82rem] font-avenir leading-[1.12rem] rounded-full font-normal text-opacity-50 bg-transparent border-solid border-[0.06rem] border-opacity-30  px-2 h-[1.34rem] hover:bg-gray-200 hover:text-black"
                            onClick={() => handleOpen(item)}
                        >
                            Redeem
                        </Button>
                    </div>
                )
        }
    }

    function handleOpen(item:any) {
        setSelectedPosition(item);
        // setRTSymbol(item)
        setOnOpne(true);
    }

    function handleClosePopup() {
        setRTSymbol("");
        setSelectedPosition(null);
        setOnOpne(false);
    }
    
    return (


        <div>
            <Accordion variant="bordered" >
                {(positionsDatas || []).map((items, index) => (
                    items[index] && (
                        <AccordionItem
                            key={index}
                            aria-label={`Accordion ${index}`}
                            title={
                                <div>
                                    <span className="text-white ml-4">{items[index].name}</span>
                                </div>
                            }
                            className="shadow-card bg-modal border-[0.06rem] border-card"
                        >
                            <Table
                                removeWrapper
                                classNames={{
                                th: "bg-transparent text-center border-b border-divider border-[#4A325D] border-opacity-[0.3]",
                                tr: "border-divider border-[#4A325D] border-opacity-[0.3] outline-2",
                                td: "text-center text-white",
                                }}>
                                <TableHeader columns={positionTableColumns}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                </TableHeader>
                                <TableBody items={items} emptyContent={"No data"}>
                                {(item: any) => (
                                    <TableRow
                                    key={item.name}
                                    >
                                        {(columnKey) => <TableCell>{getTableData(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                            {selectedPosition && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="relative">
                                        <RedeemCard positionData={selectedPosition}/>
                                        <Button
                                            onClick={handleClosePopup}
                                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Close"
                                        >
                                            <X className="h-6 w-6" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </AccordionItem>
                    )))}
            </Accordion>
        </div>
    )
}

