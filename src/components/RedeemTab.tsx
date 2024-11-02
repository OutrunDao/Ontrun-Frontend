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
  const [PT, setPT] = useState<Currency>();
  const [POT, setPOT] = useState<POT>();
  const [PTBalance, setPTBalance] = useState<Decimal>(new Decimal(0));
  const [POTBalance, setPOTBalance] = useState<Decimal>(new Decimal(0));
  const [PTPOTAmount, setPTPOTAmount] = useState("");

  useEffect(() => {
    if (!chainId || !tokenName || !StakeCurrencyListMap[chainId]) return;

    const tokens = StakeCurrencyListMap[chainId][tokenName];
    if (tokens) {
      setPT(tokens.UPT[chainId]);
      setPOT(tokens.POT[chainId]);
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
      <div className="w-[28rem] h-[14rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8">
      <div>
          <Input
            placeholder="0.00"
            value={PTPOTAmount}
            onValueChange={setPTPOTAmount}
            classNames={{
              base: "h-[2.5rem] text-white",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[10rem]",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={

              <TokenSure token={PT}/>
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: {PTBalance?.toFixed(6)}
              </span>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～$0
            </span>
          </div>
        </div>
        <Divider className="w-[30.85rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 ml-[-2rem]" />
        <div>
          <Input
            placeholder="0.00"
            value={PTPOTAmount}
            onValueChange={setPTPOTAmount}
            classNames={{
              base: "h-[2.5rem] text-white",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[10rem]",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={

              <TokenSure token={POT}/>
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: {POTBalance?.toFixed(6)}
              </span>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～$0
            </span>
          </div>
        </div>
      </div>
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
