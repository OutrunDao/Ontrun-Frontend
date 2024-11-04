import { Button, Divider, Input, Link } from "@nextui-org/react";
import { use, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import ToastCustom from "./ToastCustom";
import TokenSelect from "./TokenSelect";
import TokenSure from "./TokenSure";
import { Currency } from "@/packages/core";
import { useSearchParams } from "next/navigation";
import { StakeCurrencyListMap } from "@/contracts/currencys";
import { POT } from "@/contracts/tokens/POT";
import Decimal from "decimal.js-light";
import { set } from "radash";
import { usePOT } from "@/hooks/usePOT";
import { ethers, parseEther } from "ethers";
import TokenTab from "./TokenTab";

export default function RedeemTab({
  // tokenName,

  positionData,
}:{
  // tokenName:string

  positionData:any
}) {

  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  // const searchParams = useSearchParams();
  const tokenName = positionData.RTSymbol;
  const PositionId = positionData.PositionId;
  const [PT, setPT] = useState<Currency>();
  const [POT, setPOT] = useState<POT>();
  const [RT, setRT] = useState<Currency>();
  const [PTBalance, setPTBalance] = useState<Decimal>(new Decimal(0));
  const [POTBalance, setPOTBalance] = useState<Decimal>(new Decimal(0));
  const [PTPOTAmount, setPTPOTAmount] = useState("");
  const [RTAmount, setRTAmount] = useState<Decimal>(new Decimal(0));

  const UsePOT = usePOT();

  useEffect(() => {
    if (!chainId || !tokenName || !StakeCurrencyListMap[chainId]) return;

    const tokens = StakeCurrencyListMap[chainId][tokenName];
    if (tokens) {
      setPT(tokens.UPT[chainId]);
      setPOT(tokens.POT[chainId]);
      setRT(tokens.RT[chainId]);
    }
    
  },[chainId, tokenName])

  useEffect(() => {
    // async function _NT() {
    //   if (!account.address || !NT || !publicClient) return new Decimal(0);
    //   return NT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    // }
    // _NT().then(setNTBalance);

    async function _PT() {
      if (!account.address || !PT || !publicClient) return new Decimal(0);
      return PT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _PT().then(setPTBalance);
    setPOTBalance(positionData.POTBalance);
    // async function _YT() {
    //   if (!account.address || !YT || !publicClient) return new Decimal(0);
    //   return YT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    // }
    // _YT().then(setYTBalance);

    // async function _SY() {
    //   if (!account.address || !SY || !publicClient) return new Decimal(0);
    //   return SY.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    // }
    // _SY().then(setSYBalance);
  }, [chainId, account.address, PT]);

  useEffect(() => {

    async function _() {
      if (!POT || !PTPOTAmount) return new Decimal(0); // Add this line to check if POT is undefined
      const result = await UsePOT.POTRead.previewRedeem({
        POT: POT,
        positionId: BigInt(PositionId),
        positionShare: BigInt(parseEther(PTPOTAmount)),
      });
      const result2 = new Decimal(ethers.formatEther(result || "0"));
      return result2;
    }
    _().then(setRTAmount)
  },[positionData,PTPOTAmount])


  async function redeem() {
    if (!account.address)
      return toast.custom(<ToastCustom content="Please Connect Wallet" />);

    // Mock redeem function
    toast.custom(() => (
      <ToastCustom
        content={
          <>
            {`You have successfully redeemed ${PTPOTAmount} ${PT?.symbol}`}
            . View on <Link href="#">BlockExplorer</Link>
          </>
        }
      />
    ));


  }

  return (
    <div className="flex flex-col items-center">
      <TokenTab Balance={PTBalance} InputValue={PTPOTAmount} onValueChange={setPTPOTAmount} token={PT}/>
      <div className="text-white flex m-1 w-full justify-around items-center"></div>
        {/* <Divider className="w-[30.85rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 ml-[-2rem]" /> */}
      <TokenTab Balance={POTBalance} InputValue={PTPOTAmount} onValueChange={setPTPOTAmount} token={POT} ifMax={true}/>
      <div className="text-white flex m-10 w-full justify-around items-center"></div>
      <TokenTab Balance={new Decimal(0)} InputValue={Number(RTAmount)?RTAmount.toFixed(6):""} token={RT}/>
        
      <div className="flex flex-col gap-y-[0.35rem] w-[28rem] text-[0.82rem] leading-[1.12rem] font-avenir font-medium my-[0.71rem]">
        <div className="flex justify-between w-full text-white text-opacity-50">
          {/* <span>Exchange Rate</span>
          <span>
            1 {token0.symbol} = {exchangeRate} {token1.symbol}
          </span> */}
        </div>
      </div>
      <Button
        onClick={redeem}
        isDisabled={!PTPOTAmount}
        className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
        {'Redeem'}
      </Button>
    </div>
  );
}
