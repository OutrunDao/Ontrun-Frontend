import { Button, Divider, Input, Link, Slider } from "@nextui-org/react";
import { use, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import ToastCustom from "./ToastCustom";
import TokenSelect from "./TokenSelect";
import { Currency, Ether, Token } from "@/packages/core";
import { useSearchParams } from "next/navigation";
import { USDB, tBNB } from "@/contracts/tokens/tokens";
import { CurrencySelectListType, StakeCurrencyListMap } from "@/contracts/currencys";
import TokenSure from "./TokenSure";
import Decimal from "decimal.js-light";
import { UBNB } from "@/contracts/tokens/UPT";
import { YT, YTslisBNB } from "@/contracts/tokens/YT";
import { SYslisBNB } from "@/contracts/tokens/SY";
import { useSY } from "@/hooks/useSY";
import { ChainETHSymbol } from "@/contracts/chains";
import { useYT } from "@/hooks/useYT";
import StakeSetting from "./trade/StakeSetting";
import { useStakeRouter } from "@/hooks/useStakeRouter";
import { parseEther } from "viem";
import { usePOT } from "@/hooks/usePOT";
import { set } from "radash";
import { N, ethers } from "ethers";
import { POT } from "@/contracts/tokens/POT";

export default function StakeTab() {

  const searchParams = useSearchParams();
  const tokenName = searchParams.get('tokenName');
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const account = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(365);
  const [NT, setNT] = useState<Currency | Ether>();
  const [SY, setSY] = useState<Currency>();
  const [PT, setPT] = useState<Currency>();
  const [YT, setYT] = useState<Currency>();
  const [POT, setPOT] = useState<POT>();
  const [NTBalance, setNTBalance] = useState<Decimal>(new Decimal(0));
  const [PTBalance, setPTBalance] = useState<Decimal>(new Decimal(0));
  const [YTBalance, setYTBalance] = useState<Decimal>(new Decimal(0));
  const [SYBalance, setSYBalance] = useState<Decimal>(new Decimal(0));
  const [NTAmount, setNTAmount] = useState("");
  const [SYAmount, setSYAmount] = useState("");
  const [PTAmount, setPTAmount] = useState("");
  const [YTAmount, setYTAmount] = useState("");
  const [NTSymbol, setNTSymbol] = useState<string | undefined>("");
  const [exchangeRate, setExchangeRate] = useState<Decimal>();
  const [slippage, setSlippage] = useState(0.1);
  const UseSY = useSY();
  const UseYT = useYT();
  const UseStakeRouter = useStakeRouter();
  const UsePOT = usePOT();

  const [CurrencyList, setCurrencyList] = useState<CurrencySelectListType>();

  useEffect(() => {
    if (!chainId || !tokenName || !StakeCurrencyListMap[chainId]) return;

    // setTokens(StakeCurrencyListMap[chainId]["slisBNB"]);
    const tokens = StakeCurrencyListMap[chainId][tokenName];
    if (tokens) {
      setNT(tokens.NT.onChain(chainId));
      setSY(tokens.SY[chainId]);
      setPT(tokens.UPT[chainId]);
      setYT(tokens.YT[chainId]);
      setPOT(tokens.POT[chainId]);
      setCurrencyList([tokens.NT, tokens.RT]);
    }
    
  },[chainId, tokenName])

  useEffect(() => {
    async function _NT() {
      if (!account.address || !NT || !publicClient) return new Decimal(0);
      return NT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _NT().then(setNTBalance);

    async function _PT() {
      if (!account.address || !PT || !publicClient) return new Decimal(0);
      return PT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _PT().then(setPTBalance);

    async function _YT() {
      if (!account.address || !YT || !publicClient) return new Decimal(0);
      return YT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _YT().then(setYTBalance);

    async function _SY() {
      if (!account.address || !SY || !publicClient) return new Decimal(0);
      return SY.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _SY().then(setSYBalance);

  }, [chainId, account.address, NT]);

  useEffect(() => {
    async function _() {
      if (SY) {
        return await UseSY.SYView.exchangeRate(SY);
      }
    }
    _().then(setExchangeRate);
  },[SY])

  useEffect(() => {
    if (NT?.symbol == "ETH") {
      setNTSymbol(ChainETHSymbol[chainId])
    } else {
      setNTSymbol(NT?.symbol);
    }
  }, [NT,chainId])
  
  const title = useMemo(() => {
    if (!NT) return "Choose Token";
    return `Stake`;
  }, [NT]);

  useEffect(() => {

    async function _() {
      if (NTAmount) {
        if (NT?.symbol != tokenName && SY) {
          return String(+NTAmount * Number(exchangeRate?.toFixed(18)));
        } else {
          return NTAmount;
        }
      } else {
        return "";
      }
    }
    _().then(setSYAmount);
  }, [NTAmount, exchangeRate, NT]);

  // useEffect(() => {

  //   async function _() {
  //     const { PTReviewAmount } = await handlePTYTAmount() as { PTReviewAmount: string; YTReviewAmount: string; };
  //     return PTReviewAmount;
  //   }
  //   _().then(setPTAmount);
  // }, [SYAmount, exchangeRate, NT]);

  useEffect(() => {
    async function _YT() {
      const result = await handlePTYTAmount(SYAmount, sliderValue) as { PTReviewAmount: string; YTReviewAmount: string; };
      return ethers.formatEther(result?.YTReviewAmount || "0");
    }
    _YT().then(setYTAmount);
    async function _PT() {
      const result = await handlePTYTAmount(SYAmount, sliderValue) as { PTReviewAmount: string; YTReviewAmount: string; };
      return ethers.formatEther(result?.PTReviewAmount || "0");
    }
    _PT().then(setPTAmount);
  },[SYAmount, sliderValue, NT])

  // useEffect(() => {
  //   async function _() {
  //     if (NTAmount) {
  //       return String(await handlePTAmount(NTAmount));
  //     } else {
  //       return "";
  //     }
  //   }
  //   _().then(setPTAmount);
  // }, [NTAmount, exchangeRate, NT]);

  // useEffect(() => {
  //   async function _() {
  //     if (NTAmount) {
  //       return String(await handleYTAmount(NTAmount));
  //     } else {
  //       return "";
  //     }
  //   }
  //   _().then(setYTAmount);
  // },[NTAmount, sliderValue, NT])
  
  function onSelectNT(token: any) {
    setNT(token);
  }

  async function Stake() {
    if (!account.address)
      return toast.custom(<ToastCustom content="Please Connect Wallet" />);

    if (POT && PT && YT && SYAmount && NT) {
      setIsLoading(true);
      // try {
        const receipt = await UseStakeRouter.mintYieldTokensFromToken({
          SYAddress: (SY as Token).address,
          POTAddress: POT.address,
          TokenInAddress: NT.symbol == "ETH"?"0x0000000000000000000000000000000000000000":(NT as Token).address,
          tokenAmount: BigInt(parseEther(NTAmount)),
          lockupDays: BigInt(sliderValue),
          minPTGenerated: BigInt(0),
          PTAddress: (PT as Token).address,
          UPTAddress: "0x0000000000000000000000000000000000000000",
          value: NT.symbol == "ETH"?parseEther(NTAmount):undefined,
        })
  
        toast.custom(() => (
          <ToastCustom
            content={receipt.status === 1 ?
              <>
                {`You have successfully staked ${NTAmount} ${NTSymbol} for ${PTAmount} ${PT?.symbol}`}
                . View on <Link href="#">BlockExplorer</Link>
              </>
              : "Transaction failed"
            }
          />
        ));
      // } catch (error) {
      //   toast.custom(() => (
      //     <ToastCustom
      //       content={"Transaction failed"}
      //     />
      //   ));
      // } finally {
      //   setIsLoading(false);
      //   setNTAmount("");
      // }
      
    }
  }

  async function handlePTYTAmount(SYAmount:string, sliderValue:number) {
    if (!POT || !YT) return;
    const YTtotalSupply = await UseYT.YTView.totalSupply(YT);
    if (!YTtotalSupply) return SYAmount;
    const [YTGenerateable, PTGenerateable] = await UsePOT.POTRead.previewStake({
      POT: POT,
      amountInSY: BigInt(parseEther(SYAmount)),
      lockupDays: BigInt(sliderValue),
    })
    return ({
      PTReviewAmount: String(PTGenerateable),
      YTReviewAmount: String(YTGenerateable),
    });
  }

  return (
    <div className="flex flex-col items-center">
      {/* <StakeSetting
          slippage={slippage}
          setSlipPage={setSlippage}
        /> */}
      <div className="w-[28rem] h-[7rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8">
        <div>
          <Input
            placeholder="0.00"
            value={NTAmount}
            onValueChange={setNTAmount}
            classNames={{
              base: "h-[2.5rem] text-white",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[12rem]",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={
              <TokenSelect
                tokenList={CurrencyList}
                token={NT as any}
                onSelect={onSelectNT}
                tokenSymbol={NTSymbol}
              />
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: {NTBalance.toFixed(6)}
              </span>
              <Button
                onClick={() => setNTAmount(NTBalance.toFixed(18))}
                className="text-white text-[0.82rem] font-avenir leading-[1.12rem] font-normal text-opacity-50 bg-transparent rounded-[1.76rem] border-solid border-[0.06rem] border-opacity-30  px-0 min-w-[2.67rem] h-[1.34rem]">
                Max
              </Button>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～$0
            </span>
          </div>
        </div>
      </div>

      <div className="flex m-10 w-full justify-around items-center"></div>

      <div className="w-[28rem] h-[14rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8">

        {/* <Divider className="w-[30.85rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 ml-[-2rem]" /> */}
        
        
        <div>
          <Input
            placeholder="0.00"
            value={Number(PTAmount)?PTAmount:""}
            readOnly
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
                balance: {PTBalance.toFixed(6)}
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
            value={(Number(YTAmount)?YTAmount:"")}
            readOnly
            classNames={{
              base: "h-[2.5rem] text-white",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[10rem]",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={

              <TokenSure token={YT}/>
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: {YTBalance.toFixed(6)}
              </span>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～$0
            </span>
          </div>
        </div>

      </div>
      <div className="flex m-8 w-full justify-around items-center">
        <Divider className="w-[8.76rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-30" />
        <span className="text-white font-avenir text-[0.82rem] leading-[1.12rem]">LOCK PERIOD</span>
        <Divider className="w-[8.76rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-30" />
      </div>
      <Input
        value={sliderValue.toString()}
        onValueChange={(value) => setSliderValue(Number(value))}
        classNames={{
          base: "w-[28rem] rounded-xl text-white font-medium font-avenir border-[0.03rem] border-[#504360] hover:bg-transparent",
          input: "data-[hover=true]:bg-transparent text-right group-data-[has-value=true]:text-white font-black",
          inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
        }}
        startContent={
          <div className="flex h-5 items-center space-x-4 ml-4">
            <p>days</p>
            <Divider orientation="vertical" className="bg-white bg-opacity-30" />
          </div>
        }
      />
      <Slider
        value={sliderValue}
        onChange={(value) => setSliderValue(value as number)}
        color="secondary"
        size="sm"
        step={1}
        maxValue={365}
        minValue={7}
        className="w-[28rem] mt-[0.88rem]"
        renderThumb={(props) => (
          <div
            {...props}
            className="w-[0.94rem] h-[0.94rem] group p-1 top-1/2 bg-thumb border-[0.13rem] rounded-full cursor-grab data-[dragging=true]:cursor-grabbing">
            <span className="transition-transform bg-thumb rounded-full w-full h-full block group-data-[dragging=true]:scale-80" />
          </div>
        )}
      />

      <div className="flex flex-col gap-y-[0.35rem] w-[28rem]  text-[0.82rem] leading-[1.12rem] font-avenir font-medium my-[0.71rem]">
        <div className="flex justify-between w-full text-white text-opacity-50">
          <span>Exchange Rate</span>
          {NT&&PT ?  <span>1 {NTSymbol} = {1 / Number(exchangeRate?.toFixed(18))} {PT.symbol}</span> : null}
          
        </div>
      </div>
      <Button
        onClick={Stake}
        isLoading={isLoading}
        isDisabled={!Number(NTAmount) || !Number(PTAmount) }
        className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
        {title}
      </Button>
    </div>
  );
}
