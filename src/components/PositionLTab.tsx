import { Button } from "@/components/ui/button"
import { useAccount, useChainId } from "wagmi";
import { getTokensByChainId } from "@/contracts/tokens/tokenStake";
import { StakeCurrencyListMap } from "@/contracts/currencys";
import { Fragment, useEffect, useMemo, useState } from "react";
import { POT } from "@/contracts/tokens/POT";
import { usePOT } from "@/contracts/useContract/usePOT";
import { ethers } from "ethers";
import Decimal from "decimal.js-light";
import RedeemTab from "./RedeemTab";
import { all, chain, set } from "radash";
import { X } from 'lucide-react'
import RedeemCard from "./RedeemCard";
import Position from "@/app/staking/position/page";
import { useYT } from "@/contracts/useContract/useYT";
import { Accordion, AccordionItem, Divider} from "@nextui-org/react";



export default function PositionLTab() {

    const chainId = useChainId();
    const account = useAccount();

    const tokensOnChain = useMemo(() => getTokensByChainId(chainId), [chainId]);
    const [positionDatas,setPositionDatas] = useState<any[]>();
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
                const APY = await UseYT.YTView.APY({YT:POTs[i].YT} );
                if (!result) return;
                for (let j = 0; j < result.length; j++) {
                    const POTBalance = new Decimal(ethers.formatEther(allPOT[j].value || "0"));
                    const PositionId = allPOT[j].tokenId.toString();
                    const principalRedeemable = new Decimal(ethers.formatEther(result[j][2] || "0"));
                    

                    const currentTimeInSeconds = BigInt(Math.floor(Date.now() / 1000));
                    const remainingTimeInDays = Number((result[j][3] - currentTimeInSeconds) / BigInt(60 * 60 * 24));


                    const _positionData = {
                        name: POTs[i].symbol,
                        principalRedeemable:principalRedeemable,
                        APY: APY,
                        deadline:remainingTimeInDays,
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
        // _().then(setPositionDatas);
    },[POTs]);

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
                        className="shadow-card bg-modal border-[0.06rem] rounded-[1.25rem] border-card"
                    >
                        <div className="flex justify-between relative text-purple-300 mb-8">
                            <span className="absolute left-[4%]">Name</span>
                            <span className="absolute left-[26%]">PrincipalRedeemable</span>
                            <span className="absolute left-[50%]">APY</span>
                            <span className="absolute left-[72.5%]">Unlockdays</span>
                        </div>
                    {items.map((item: any, index: number) => (
                        <div key={index}>
                            <Divider className="w-[calc(100%-1rem)] border-solid border-[0.1rem] border-[#9A6BE1] border-opacity-30 mx-2"/>
                            <div key={index} className="w-full h-[3rem] text-white relative">
                                <div className="h-"></div>
                                <div className="flex justify-between h-full items-center text-lg text-center mx-8">
                                    <span className="absolute left-[4%] top-1/2 transform -translate-y-1/2 text-white">{item.name}</span>
                                    <span className="absolute left-[25%] top-1/2 transform -translate-y-1/2 text-white">{item.principalRedeemable.toFixed(6)}</span>
                                    <span className="absolute left-[50%] top-1/2 transform -translate-y-1/2 text-white">{item.APY}%</span>
                                    <span className="absolute left-[75%] top-1/2 transform -translate-y-1/2 text-white">{item.deadline}{" "}days</span>
                                    <Button 
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-button-gradient text-white" 
                                        onClick={() => handleOpen(item)}
                                    >
                                        Redeem
                                    </Button>
                                </div>
                            </div>
                        </div>
                        

                    ))}
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
                    )

                ))}
            </Accordion>
        </div>
    )
}