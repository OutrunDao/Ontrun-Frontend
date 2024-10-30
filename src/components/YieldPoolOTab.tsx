import { useEffect, useState } from "react";
import YieldPoolTab from "./YieldPoolTab";
import { StakeCurrencyListMap } from "@/contracts/currencys";
import { Currency } from "@/packages/core";
import { useSearchParams } from "next/navigation";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import Decimal from "decimal.js-light";

export default function YieldPoolOTab() {

    const [withdrawReyAmount, setWithdrawReyAmount] = useState("");

    const searchParams = useSearchParams();
    const tokenName = searchParams.get('tokenName');
    const chainId = useChainId();
    const account = useAccount();
    const publicClient = usePublicClient();
    const [YT, setYT] = useState<Currency>();
    const [POT, setPOT] = useState<Currency>();
    const [YTBalance, setYTBalance] = useState<Decimal>(new Decimal(0));

    useEffect(() => {
        if (!chainId || !tokenName || !StakeCurrencyListMap[chainId]) return;
    
        // setTokens(StakeCurrencyListMap[chainId]["slisBNB"]);
        const tokens = StakeCurrencyListMap[chainId][tokenName];
        if (tokens) {
        //   setNT(tokens.NT.onChain(chainId));
        //   setSY(tokens.SY[chainId]);
        //   setPT(tokens.UPT[chainId]);

          setYT(tokens.YT[chainId]);
          setPOT(tokens.POT[chainId]);
        //   setCurrencyList([tokens.NT, tokens.RT]);
        }
        
    },[chainId, tokenName])

    useEffect(() => {
        // async function _NT() {
        //   if (!account.address || !NT || !publicClient) return new Decimal(0);
        //   return NT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
        // }
        // _NT().then(setNTBalance);
    
        // async function _PT() {
        //   if (!account.address || !PT || !publicClient) return new Decimal(0);
        //   return PT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
        // }
        // _PT().then(setPTBalance);
    
        async function _YT() {
          if (!account.address || !YT || !publicClient) return new Decimal(0);
          return YT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
        }
        _YT().then(setYTBalance);
    
        // async function _SY() {
        //   if (!account.address || !SY || !publicClient) return new Decimal(0);
        //   return SY.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
        // }
        // _SY().then(setSYBalance);
    
      }, [chainId, account.address]);

      

    const withdrawHandler = (type: string) => {
        console.log("burning", type);
    }

    return (
        <div className="flex flex-col items-center w-[38.44rem] h-[31.56rem] shadow-card bg-modal border-[0.06rem] rounded-[1.25rem] border-card">
            <span className="w-full text-transparent bg-clip-text bg-title font-kronaOne text-[2rem] leading-[2.3rem] text-center mt-6 mb-6">YT-</span>
            <YieldPoolTab
                type={YT?.symbol || ""}
                avgStakeDays={0}
                unclaimedYielding={"0"}
                apr={"0"}
                balance={YTBalance.toString()}
                amount={withdrawReyAmount}
                setAmount={setWithdrawReyAmount}
                loading={false}
                burn={() => {
                    withdrawHandler("rey");
                }}
            />
        </div>
    )
}