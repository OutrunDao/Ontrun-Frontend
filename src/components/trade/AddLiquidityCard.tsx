"use client";
import { BtnAction, SwapView, useSwap } from "@/hooks/useSwap";
import { Button, Image, Input, Select, SelectItem, Tab, Tabs, Link} from "@heroui/react";
import TokenSelect from "../TokenSelect";
import SwapSetting from "./SwapSetting";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ToastCustom from "../ToastCustom";
import { ChainETHSymbol } from "@/contracts/chains";
import { Ether, Currency } from "@/packages/core";

export default function AddLiquidityCard({
  isBack,
  _token0,
  _token1,
  _swapFee,
}:{
  isBack?:boolean,
  _token0?:Currency | Ether,
  _token1?:Currency | Ether,
  _swapFee?:number
}) {
  const {
    chainId,
    swapData,
    setToken0,
    setToken1,
    token0AmountInputHandler,
    token1AmountInputHandler,
    setToken0AmountInput,
    setToken1AmountInput,
    maxHandler,
    setswapFeeRate,
    approveToken0,
    approveToken1,
    addLiquidity,
    setSlippage,
    setTransactionDeadline,
    setUnlimitedAmount,
    
  } = useSwap({
    view: SwapView.addLiquidity,
    fetchPair: true,
    approve2Tokens: true,
  });

  useEffect(() => {
    if (!_token0 || !_token1 || !_swapFee) return;
    setToken0(_token0);
    setToken1(_token1);
    setswapFeeRate(BigInt(_swapFee));
  },[_token0,_token1,_swapFee])

  const [isApproveToken0Loading, setIsApproveToken0Loading] = useState(false);
  const [isApproveToken1Loading, setIsApproveToken1Loading] = useState(false);
  const [isAddLiquidityLoading, setIsAddLiquidityLoading] = useState(false);

  async function handleApproveToken0() {
    try {
      setIsApproveToken0Loading(true);
      const receipt = await approveToken0();
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
      setIsApproveToken0Loading(false);
    }
  }

  async function handleApproveToken1() {
    try {
      setIsApproveToken1Loading(true);
      const receipt = await approveToken1();
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
      setIsApproveToken1Loading(false);
    }
  }

  async function handleAddLiquidity() {
    try {
      setIsAddLiquidityLoading(true);
      const receipt = await addLiquidity();
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
      toast.custom(() => (
        <ToastCustom
          content={"Transaction failed"}
        />
      ));
    } finally {
      setIsAddLiquidityLoading(false);
    }
  }

  function handleBackClick() {
    window.history.back();
  }

  return (
    <div className="w-[34rem] min-h-[26.59rem]">
      {!isBack ? (
        <Button
          disableRipple
          className="bg-transparent text-white text-[1.13rem] leading-[1.56rem] font-medium mb-12"
          startContent={<Image alt="back" src="/images/back.svg" />}
          href="/trade/liquidity"
          as={Link}
        >
          Back
        </Button>
      ) : (
        <div className="mb-20"></div>
      )}

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
          <Tab key="swap" title="ADD LIQUIDITY">
            <div className="flex flex-col text-white gap-y-4 text-[1.25rem] leading-[1.75rem] font-avenir">
              <span>TOKEN PAIR</span>
              <div className="flex justify-between">
                <div className="border-solid border-[0.06rem] border-[#4A325D] border-opacity-[0.5] px-4 py-2">
                  <TokenSelect
                    tokenList={swapData.CurrencyList}
                    token={swapData.token0}
                    tokenDisable={swapData.token1}
                    onSelect={(token) => setToken0(token)}
                  />
                </div>
                <div className="border-solid border-[0.06rem] border-[#4A325D] border-opacity-[0.5] px-4 py-2">
                  <TokenSelect
                    tokenList={swapData.CurrencyList}
                    token={swapData.token1}
                    tokenDisable={swapData.token0}
                    onSelect={(token) => setToken1(token)}
                  />
                </div>
              </div>
              <Select
                onChange={(event) => setswapFeeRate(BigInt(Number(event.target.value)*100))}
                classNames={{
                  trigger:
                    "bg-transparent data-[hover=true]:bg-transparent border-solid border-[0.06rem] border-[#4A325D] rounded-none border-opacity-[0.5]",
                  value: "group-data-[has-value=true]:text-white ml-2",
                  popoverContent: "bg-[#4A325D]",
                  listboxWrapper: "text-white",
                  
                }}
                defaultSelectedKeys={[String(Number(swapData.swapFeeRate)/100)]}
                >
                <SelectItem key="0.3" value={0.3}>
                  0.3% fee tier
                </SelectItem>
                <SelectItem key="1" value={1}>
                  1% fee tier
                </SelectItem>
              </Select>
              <span className="mt-8">SUPPLY AMOUNT</span>
              <div className="w-[30.2rem] h-[6.5rem] bg-[#1D1226] px-4 flex flex-col justify-center">
                <Input
                  placeholder="0.00"
                  value={swapData.token0AmountInput}
                  onValueChange={(value) => {
                    setToken0AmountInput(value);
                  }}
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
                <div className="flex justify-between mt-4">
                  <div className="text-white text-opacity-50 flex gap-x-4">
                    <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                      balance: {swapData.token0Balance.toFixed(6)}
                    </span>
                    <Button
                      onClick={() => setToken0AmountInput(swapData.token0Balance.toString())}
                      className="text-white text-[0.82rem] font-avenir leading-[1.12rem] font-normal text-opacity-50 bg-transparent border-solid border-[0.06rem] border-opacity-30  px-0 min-w-[2.67rem] h-[1.34rem]">
                      Max
                    </Button>
                  </div>
                  <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
                    --{}
                  </span>
                </div>
              </div>
              <div className="w-[30.2rem] h-[6.5rem] bg-[#1D1226] px-4 flex flex-col justify-center">
                <Input
                  placeholder="0.00"
                  value={swapData.token1AmountInput}
                  onValueChange={(value) => {
                    setToken1AmountInput(value);
                  }}
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
                <div className="flex justify-between mt-4">
                  <div className="text-white text-opacity-50 flex gap-x-4">
                    <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                      balance: {swapData.token1Balance.toFixed(6)}
                    </span>
                    <Button
                      onClick={() => setToken1AmountInput(swapData.token1Balance.toString())}
                      className="text-white text-[0.82rem] font-avenir leading-[1.12rem] font-normal text-opacity-50 bg-transparent border-solid border-[0.06rem] border-opacity-30  px-0 min-w-[2.67rem] h-[1.34rem]">
                      Max
                    </Button>
                  </div>
                  <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
                    --{}
                  </span>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {swapData.isToken0Approved ? swapData.isToken1Approved ? (
                  <Button
                    onPress={handleAddLiquidity}
                    isDisabled={swapData.submitButtonStatus === BtnAction.disable || !swapData.isToken0Approved || !swapData.isToken1Approved}
                    isLoading={isAddLiquidityLoading}
                    className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                      {swapData.submitButtonStatus === BtnAction.disable? "Input Please" : swapData.isToken0Approved && swapData.isToken1Approved ? "AddLiquidity" : "Approve Please"}
                  </Button>
                ) : (
                  <Button
                    onPress={handleApproveToken1}
                    isDisabled={swapData.submitButtonStatus === BtnAction.disable || swapData.isToken1Approved}
                    isLoading={isApproveToken1Loading}
                    className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                    {swapData.submitButtonStatus === BtnAction.disable? "Input Please" :swapData.isToken1Approved ? "Approved" : "Approve Token1"}
                  </Button>
                ) : (
                  <Button
                    onPress={handleApproveToken0}
                    isDisabled={swapData.submitButtonStatus === BtnAction.disable || swapData.isToken0Approved}
                    isLoading={isApproveToken0Loading}
                    className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                    {swapData.submitButtonStatus === BtnAction.disable? "Input Please" :swapData.isToken0Approved ? "Approved" : "Approve Token0"}
                  </Button>
                )}
              </div>

            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
