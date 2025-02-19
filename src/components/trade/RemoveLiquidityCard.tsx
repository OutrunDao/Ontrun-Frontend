import { BtnAction, SwapView, useSwap } from "@/hooks/useSwap";
import { Button, Image, Input, Select, SelectItem, Tab, Tabs, Link} from "@heroui/react";
import TokenSelect from "../TokenSelect";
import SwapSetting from "./SwapSetting";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ToastCustom from "../ToastCustom";
import { ChainETHSymbol } from "@/contracts/chains";
import { Ether, Currency } from "@/packages/core";
import { useERC20 } from "@/contracts/useContract/useERC20";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";


export default function RemoveLiquidityCard({
  data,
}:{
  data?: any
}) {
  const {
    chainId,
    swapData,
    setToken0,
    setToken1,
    approveToRouter,
    removeLiquidity,
    setswapFeeRate,
    approveToken0,
    approveToken1,
    setSlippage,
    setTransactionDeadline,
    setUnlimitedAmount,
  } = useSwap({
    view: SwapView.addLiquidity,
    fetchPair: true,
    approve2Tokens: true,
  });

  const account = useAccount();

  const [pairAddress, setPairAddress] = useState<string | undefined>(undefined);
  const [reserve0, setReserve0] = useState<number | undefined>(undefined);
  const [reserve1, setReserve1] = useState<number | undefined>(undefined);
  const [totalSupply, setTotalSupply] = useState<number | undefined>(undefined);
  const [liquidityTokenBalance, setLiquidityTokenBalance] = useState<number | undefined>(undefined);
  const [liquidity, setLiquidity] = useState<string | undefined>(undefined);
  const [token0Amount, setToken0Amount] = useState<number | undefined>(undefined);
  const [token1Amount, setToken1Amount] = useState<number | undefined>(undefined);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const UseERC20 = useERC20();

  useEffect(() => {
    async function _() {
      if (!liquidity || !pairAddress || !account.address || !swapData.routerAddress) {setIsApproved(false);return;} 
      const allowance = await UseERC20.ERC20View.allowance({
        tokenAddress: pairAddress,
        ownerAddress: account.address,
        spenderAddress: swapData.routerAddress,
      });
      if (allowance == 0) {
        setIsApproved(false);
        return;
      } else {
        setIsApproved(allowance >= parseUnits(liquidity, 18) );
        return;
      }
    }
    _();
  },[liquidity])

  useEffect(() => {
    if (!data) return;
    setToken0(data.token0);
    setToken1(data.token1);
    setswapFeeRate(BigInt(data.feeRate*100));
    setPairAddress(data.pairAddress);
    setReserve0(data.reserve0);
    setReserve1(data.reserve1);
    setTotalSupply(data.totalSupply);
    setLiquidityTokenBalance(data.liquidityTokenBalance);
  },[data])

  useEffect(() => {
    if (!liquidity) return;
    setToken0Amount((Number(reserve0) * Number(liquidity) / Number(totalSupply)));
    setToken1Amount((Number(reserve1) * Number(liquidity) / Number(totalSupply)));
  },[liquidity])

  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isRemoveLiquidityLoading, setIsRemoveLiquidityLoading] = useState(false);

  async function handleApprove() {
    if (!liquidity || !pairAddress) {
      toast.custom(() => (
        <ToastCustom
          content={"Input Please"}
        />
      ));
      return;
    }
    try {
      setIsApproveLoading(true);
      const receipt = await approveToRouter({
        token: pairAddress,
        amount: Number(liquidity),
      });
      if (receipt.status === 1) {
        setIsApproved(true);
      }
      toast.custom(() => (
        <ToastCustom
          content={receipt.status === 1 ?
            <>
              {`Approve Success`}
            </>
            : "Transaction failed"
          }
        />
      ));
    } catch (error) {
      toast.custom(() => (
        <ToastCustom
          content={"Transaction failed"}
        />
      ));
    } finally {
      setIsApproveLoading(false);
    }
  }

  async function handleRemoveLiquidity() {
    if (!liquidity || !token0Amount || !token1Amount) {
      toast.custom(() => (
        <ToastCustom
          content={"Input Please"}
        />
      ));
      return;
    }
    try {
      setIsRemoveLiquidityLoading(true);
      const receipt = await removeLiquidity({
        liquidity: Number(liquidity),
        Amount0: token0Amount,
        Amount1: token1Amount,
      });
      toast.custom(() => (
        <ToastCustom
          content={receipt.status === 1 ?
            <>
              {`Add Liquidity Success`}
            </>
            : "Transaction failed"
          }
        />
      ));
    } catch (error) {
      console.log(error);
      toast.custom(() => (
        <ToastCustom
          content={"Transaction failed"}
        />
      ));
    } finally {
      setIsRemoveLiquidityLoading(false);
    }
  }

  return (
    (<div className="w-[34rem] min-h-[26.59rem]">
      <div className="mb-20"></div>
      <div className="w-[34rem] min-h-[39.13rem] shadow-card bg-modal border-[0.06rem] border-card relative">
        <div className="absolute z-10 text-white top-[2.29rem] right-[2rem]">
          <SwapSetting
            slippage={swapData.slippage}
            setSlipPage={setSlippage}
            deadline={swapData.transactionDeadline}
            setDeadline={setTransactionDeadline}
            unlimit={swapData.unlimitedAmount}
            setUnlimit={setUnlimitedAmount}
          />
        </div>
        <Tabs
          aria-label="swap"
          classNames={{
            base: "w-full",
            tab: "h-full data-[hover-unselected=true]:opacity-100 bg-transparent font-kronaOne",
            tabList: "h-full flex gap-x-8 rounded-none px-4 pt-8 bg-transparent border-white border-b border-divider",
            tabContent:
              "text-white group-data-[selected=true]:bg-title text-[1.5rem] leading-[1.88rem] font-kronaOne group-data-[selected=true]:text-transparent group-data-[selected=true]:bg-clip-text",
            cursor: "bg-transparent",
            panel: "mx-6 mb-8",
          }}>
          <Tab key="swap" title="REMOVE LIQUIDITY">
            <div className="flex flex-col text-white gap-y-4 text-[1.25rem] leading-[1.75rem] font-avenir">
              <span>LIQUIDITY</span>
              <div className="flex justify-between">
                <div className="w-[30.2rem] h-[6.5rem] border-solid border-[0.06rem] border-[#4A325D] border-opacity-[0.5] px-4 py-2 flex flex-col justify-center">
                  <Input
                    placeholder="0.00"
                    value={liquidity}
                    onValueChange={(value) => {
                      if (value === "") {
                        setLiquidity("0");
                      } else {
                        setLiquidity(value);
                      }
                    }}
                    classNames={{
                      base: "h-[2.5rem] text-white",
                      input:
                        "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-full",
                      inputWrapper:
                        "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
                      innerWrapper: "justify-between",
                    }}
                    startContent={
                      <div className="flex text-white font-avenir bg-transparent border-solid border-[0.06rem] border-[#4A325D] border-opacity-30  px-4 py-2">
                        <span className="text-[1.25rem] leading-7">
                          {swapData.token0?.isNative ? ChainETHSymbol[chainId] : swapData.token0?.symbol}/
                          {swapData.token1?.isNative ? ChainETHSymbol[chainId] : swapData.token1?.symbol}
                        </span>
                      </div>
                    }

                  />
                  <div className="flex justify-between mt-4">
                    <div className="text-white text-opacity-50 flex gap-x-4">
                      <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                        balance: {Number(liquidityTokenBalance ?? 0).toFixed(6).replace(/\.?0+$/, '')}
                      </span>
                      <Button
                        onClick={() => setLiquidity(liquidityTokenBalance?.toString() ?? '0')}
                        className="text-white text-[0.82rem] font-avenir leading-[1.12rem] font-normal text-opacity-50 bg-transparent border-solid border-[0.06rem] border-opacity-30  px-0 min-w-[2.67rem] h-[1.34rem]">
                        Max
                      </Button>
                    </div>
                    <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
                      --{}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[30.2rem] border-solid border-[0.06rem] border-[#4A325D] border-opacity-[0.5] px-4 py-2 text-[0.9rem]">
              <span className="">{Number(swapData.swapFeeRate)/100}% fee tier</span>
              </div>
              <span className="mt-8">AMOUNT</span>
              <div className="w-[30.2rem] h-[6.5rem] bg-[#1D1226] px-4 flex flex-col justify-center">
                <Input
                  placeholder="0.00"
                  value={token0Amount?.toFixed(6).replace(/\.?0+$/, '') ?? '0'}
                  classNames={{
                    base: "h-[2.5rem] text-white",
                    input:
                      "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[12rem]",
                    inputWrapper:
                      "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
                    innerWrapper: "justify-between",
                  }}
                  startContent={
                    <div className="flex text-white font-avenir bg-transparent border-solid border-[0.06rem] border-[#4A325D] border-opacity-30  px-4 py-2">
                      <Image alt="icon" src="/images/select-token.svg" className="w-[1.59rem] h-[1.55rem] mr-4" />
                      <span className="text-[1.25rem] leading-7">
                        {swapData.token0?.isNative ? ChainETHSymbol[chainId] : swapData.token0?.symbol}
                      </span>
                    </div>
                  }
                />
              </div>
              <div className="w-[30.2rem] h-[6.5rem] bg-[#1D1226] px-4 flex flex-col justify-center">
                <Input
                  placeholder="0.00"
                  value={token1Amount?.toFixed(6).replace(/\.?0+$/, '') ?? '0'}
                  classNames={{
                    base: "h-[2.5rem] text-white",
                    input:
                      "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[12rem]",
                    inputWrapper:
                      "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
                    innerWrapper: "justify-between",
                  }}
                  startContent={
                    <div className="flex text-white font-avenir bg-transparent border-solid border-[0.06rem] border-[#4A325D] border-opacity-30  px-4 py-2">
                      <Image alt="icon" src="/images/select-token.svg" className="w-[1.59rem] h-[1.55rem] mr-4" />
                      <span className="text-[1.25rem] leading-7">
                        {swapData.token1?.isNative ? ChainETHSymbol[chainId] : swapData.token1?.symbol}
                      </span>
                    </div>
                  }
                />
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {isApproved ? (
                  <Button
                    onPress={handleRemoveLiquidity}
                    isDisabled={!isApproved || liquidity === '0' || !liquidity}
                    isLoading={isRemoveLiquidityLoading}
                    className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                      {"Remove Liquidity"}
                  </Button>
                ) : (
                  <Button
                    onPress={handleApprove}
                    isDisabled={isApproved || liquidity === '0' || !liquidity}
                    isLoading={isApproveLoading}
                    className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                    {"Approve"}
                  </Button>
                )}
              </div>

            </div>
          </Tab>
        </Tabs>
      </div>
    </div>)
  );
}
