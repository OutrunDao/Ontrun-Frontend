import { useEffect, useState } from "react";
import YieldPoolOTab from "./YieldPoolOTab";
import { StakeCurrencyListMap } from "@/contracts/currencys";
import { Currency } from "@/packages/core";
import { useSearchParams } from "next/navigation";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import Decimal from "decimal.js-light";
import { useYT } from "@/hooks/useYT";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { ethers, parseEther } from "ethers";
import { set } from "radash";
import { POT } from "@/contracts/tokens/POT";

export default function YieldPoolOCard() {

    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [amountOut, setAmountOut] = useState<string | undefined>("");

    const searchParams = useSearchParams();
    const tokenName = searchParams.get('tokenName');
    const chainId = useChainId();
    const account = useAccount();
    const publicClient = usePublicClient();
    const [isLoading, setIsLoading] = useState(false);
    const [SY, setSY] = useState<Currency>();
    const [YT, setYT] = useState<Currency>();
    const [RT, setRT] = useState<Currency>();
    const [POT, setPOT] = useState<POT>();
    const [YTBalance, setYTBalance] = useState<Decimal>(new Decimal(0));
    // const [SYBalance, setSYBalance] = useState<Decimal>(new Decimal(0));
    const [APY, setAPY] = useState<string | undefined>("");
    const UseYT = useYT();

    useEffect(() => {
        if (!chainId || !tokenName || !StakeCurrencyListMap[chainId]) return;
    
        // setTokens(StakeCurrencyListMap[chainId]["slisBNB"]);
        const tokens = StakeCurrencyListMap[chainId][tokenName];
        if (tokens) {
        //   setNT(tokens.NT.onChain(chainId));
          setSY(tokens.SY[chainId]);
        //   setPT(tokens.UPT[chainId]);

          setYT(tokens.YT[chainId]);
          setPOT(tokens.POT[chainId]);
          setRT(tokens.RT[chainId]);
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
    
    }, [chainId, account.address, YT]);

    useEffect(() => {

        async function APY() {
            if (!YT || !SY) return;
            return UseYT.YTView.APY({YT:YT,SY:SY});
        }
        
        APY().then(setAPY);
    },[YT,SY])

    useEffect(() => {
        async function _() {
            if (!YT) return;
            const _withdrawAmount = withdrawAmount === "" ? new Decimal(0) : new Decimal(withdrawAmount);
            const result = await UseYT.YTView.previewWithdrawYield({
                YT:YT,
                amountInBurnedYT:BigInt(parseEther(_withdrawAmount.toFixed(18)) || "")
            });
            return ethers.formatEther(result.toString());
        }
        _().then(setAmountOut);
    },[withdrawAmount])

    async function handleWithdraw(amountInBurnedYT:BigInt) {
        setIsLoading(true);
        if (!YT) return;
        try {
            await UseYT.YTWrite.withdrawYields({
                YT : YT,
                amountInBurnedYT : amountInBurnedYT
            })
        } catch (error) {
            
        } finally {
            setIsLoading(false);
        }
        
    }

    function handleSetWithdrawAmount(amount:string) {
        if (Number(amount) > Number(YTBalance)) {
            setWithdrawAmount(YTBalance.toFixed(18));
        } else {
            setWithdrawAmount(amount);
        }
    }

    return (
        <div className="flex flex-col items-center w-[38.44rem] h-[31.56rem] shadow-card bg-modal border-[0.06rem] rounded-[1.25rem] border-card">
            <span className="w-full text-transparent bg-clip-text bg-title font-kronaOne text-[2rem] leading-[2.3rem] text-center mt-6 mb-6">{YT?.symbol}</span>
            {/* <YieldPoolOTab
                type={YT?.symbol || ""}
                avgStakeDays={0}
                unclaimedYielding={"0"}
                apr={"0"}
                balance={YTBalance}
                amount={withdrawReyAmount}
                setAmount={setWithdrawReyAmount}
                loading={isLoading}
                burn={() => {
                    handleWithdraw;
                }}
                RTSymbol={RT?.symbol || ""}
            /> */}
            <div className="flex flex-col items-center text-white font-avenir">
            <div className="w-[33.5rem] h-[6.5rem]  bg-white bg-opacity-[0.03] rounded-[0.25rem] flex gap-x-12 items-center">
                <div className="flex flex-col gap-5 items-center ml-[1.13rem]">
                    <span className="text-[1.13rem] leading-[1.56rem] opacity-30">Average Staking Days</span>
                    <span className="text-[1.25rem] leading-[1.69rem] font-extrabold">{0}</span>
                </div>
                <div className="flex flex-col gap-5 items-center">
                    <span className="text-[1.13rem] leading-[1.56rem] opacity-30">Unclaimed Yield</span>
                    <span className="text-[1.25rem] leading-[1.69rem] font-extrabold">{0}</span>
                </div>
                <div className="flex flex-col gap-5 ml-[1.13rem]">
                    <span className="text-[1.13rem] leading-[1.56rem] opacity-30">APR</span>
                    <span className="text-[1.25rem] leading-[1.69rem] font-extrabold">{APY}%</span>
                </div>
            </div>
            <span className="text-[1.13rem] leading-[1.56rem] font-medium mt-[2.5rem]">
                Burn {YT?.symbol} To Claim {RT?.symbol}
            </span>
            <Input
                value={withdrawAmount}
                onValueChange={handleSetWithdrawAmount}
                placeholder="withdraw amount"
                classNames={{
                base: "h-[3.19rem] mt-[0.69rem] rounded-[0.75rem] text-white font-medium font-avenir border-[0.03rem] border-[#504360] hover:bg-transparent w-[33.5rem]",
                mainWrapper: "justify-center",
                input:
                    "data-[hover=true]:bg-transparent text-right group-data-[has-value=true]:text-wihte font-black text-[1.13rem] leading-[1.56rem]",
                inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                }}
                startContent={
                <div className="flex h-full items-center space-x-4">
                    <p className="text-[1.13rem] leading-[1.56rem]">Amount</p>
                    <Divider orientation="vertical" className="bg-white bg-opacity-30 h-[60%]" />
                </div>
                }
            />
            <div className="flex gap-x-2 mt-[0.81rem] ml-auto mr-10">
                <span>Balance: {YTBalance.toFixed(6)}</span>
                <Link underline="always" className="text-[#B625FF]" onPress={() => setWithdrawAmount(YTBalance.toFixed(18) || "")}>
                MAX
                </Link>
            </div>
            <Input
                value={Number(amountOut) ? amountOut : ""}
                placeholder="withdraw amount"
                classNames={{
                base: "h-[3.19rem] mt-[0.69rem] rounded-[0.75rem] text-white font-medium font-avenir border-[0.03rem] border-[#504360] hover:bg-transparent w-[33.5rem]",
                mainWrapper: "justify-center",
                input:
                    "data-[hover=true]:bg-transparent text-right group-data-[has-value=true]:text-wihte font-black text-[1.13rem] leading-[1.56rem]",
                inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                }}
                startContent={
                <div className="flex h-full items-center space-x-4">
                    <p className="text-[1.13rem] leading-[1.56rem]">AmountOut</p>
                    <Divider orientation="vertical" className="bg-white bg-opacity-30 h-[60%]" />
                </div>
                }
            />
            <Button
                isLoading={isLoading}
                isDisabled={!Number(withdrawAmount)}
                className="mt-[2.88rem] bg-button-gradient w-[12.13rem] h-[3.81rem] rounded-[4.38rem] text-[1.25rem] text-white leading-6"
                onClick={() => handleWithdraw(BigInt(parseEther(withdrawAmount || "")))}>
                Burn
            </Button>
            </div>
        </div>
    )
}