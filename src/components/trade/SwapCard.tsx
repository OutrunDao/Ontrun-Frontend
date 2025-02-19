"use client";
import { BlockExplorers, ChainETHSymbol } from "@/contracts/chains";
import { SwapCurrencyList, getSwapCurrencyList } from "@/contracts/currencys";
import useContract from "@/hooks/useContract";
import { BtnAction, SwapView, useSwap } from "@/hooks/useSwap";
import { Accordion, AccordionItem, Button, Divider, Image, Input, Tab, Tabs } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import TokenSelect from "../TokenSelect";
import SwapSetting from "./SwapSetting";
import toast from "react-hot-toast";
import ToastCustom from "../ToastCustom";
import { USDT, getTokenSymbol } from "@/contracts/tokens/tokens";
import { Ether } from "@/packages/core";
import { Token } from "graphql";

export default function SwapCard() {
  const chainId = useChainId();
  const [countdown, setCountdown] = useState(60);

  const [isApproveToken0Loading, setIsApproveToken0Loading] = useState(false);
  // const [token0Symbol, setToken0Symbol] = useState<string>();
  // const [token1Symbol, setToken1Symbol] = useState<string>();

  const {
    swapData,
    loading,
    setToken0,
    setToken1,
    setLoading,
    setSlippage,
    setTransactionDeadline,
    setUnlimitedAmount,
    token0AmountInputHandler,
    token1AmountInputHandler,
    maxHandler,
    approveToken0,
    setIsToken0Approved,
    swap,
    registerReferrer,
  } = useSwap({
    view: SwapView.swap,
    getTradeRoute: true,
  });

  async function handleApproveToken0() {
    try {
      setIsApproveToken0Loading(true);
      const receipt = await approveToken0();
      if (receipt.status === 1) {
        setIsToken0Approved(true);
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
      setIsApproveToken0Loading(false);
    }
  }

  useEffect(() => {

    setCountdown(60);
    if (!Number(swapData.token0AmountInput)) return;
    function _() {
      token0AmountInputHandler(swapData.token0AmountInput);
    }

    const intervalId = setInterval(() => {
      _();
      setCountdown(60);
    }, 60000);

    const countdownIntervalId = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown > 0 ? prevCountdown - 1 : 10);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownIntervalId);
    };
  }, [swapData.token0AmountInput]);

  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);

  const onReverse = () => {
    if (!swapData.token0 || !swapData.token1) return;
    setToken0(swapData.token1);
    setToken1(swapData.token0);
    token0AmountInputHandler("");
    token1AmountInputHandler("");
  };

  async function handleSwap() {
    try {
      setLoading(true);
      const receipt = await swap();
      toast.custom(() => (
        <ToastCustom
          content={receipt.status === 1 ?
            <>
              {`Swap Success`}
            </>
            : "Transaction failed"
          }
        />
      ));
      if (receipt.status === 1) {
        const receipt = await registerReferrer();
        if (receipt) {
          toast.custom(() => (
            <ToastCustom
              content={receipt.status === 1 &&
                <>
                  {`Register Referrer Success`}
                </>
              }
            />
          ));
        }
      }
    } catch (error) {
      console.log(error);
      toast.custom(() => (
        <ToastCustom
          content={"Transaction failed"}
        />
      ));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[34.18rem] min-h-[26.59rem] shadow-card bg-modal border-[0.06rem] border-card relative">
      <div className="absolute z-10 text-white top-[2.29rem] right-[2.71rem]">
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
          tabList: "h-full flex gap-x-8 rounded-none px-8 pt-8 bg-transparent",
          tabContent:
            "text-white group-data-[selected=true]:bg-title text-[1.5rem] leading-[1.88rem] font-kronaOne group-data-[selected=true]:text-transparent group-data-[selected=true]:bg-clip-text",
          cursor: "bg-transparent",
          panel: "mx-10 mb-8",
        }}>
        <Tab key="swap" title="Swap">
          <div className="flex flex-col items-center">
            <div className="w-full h-[14rem] border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8 relative">
              <Button isIconOnly className="bg-transparent absolute left-[50%] top-[41%]" onClick={onReverse}>
                <Image alt="transfer" src="/images/transfer-bg.svg" />
              </Button>
              <div>
                <Input
                  placeholder="0.00"
                  value={swapData.token0AmountInput}
                  onValueChange={(value) => {
                    token0AmountInputHandler(value);
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
                    <TokenSelect
                      tokenList={swapData.CurrencyList}
                      token={swapData.token0}
                      tokenDisable={swapData.token1}
                      onSelect={setToken0}
                    />
                  }
                />
                <div className="flex justify-between mt-4">
                  <div className="text-white text-opacity-50 flex gap-x-4">
                    <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                      balance: {swapData.token0Balance.toFixed(6)}
                    </span>
                    <Button
                      onClick={() => maxHandler(0)}
                      className="text-white text-[0.82rem] font-avenir leading-[1.12rem] font-normal text-opacity-50 bg-transparent rounded-[1.76rem] border-solid border-[0.06rem] border-opacity-30  px-0 min-w-[2.67rem] h-[1.34rem]">
                      Max
                    </Button>
                  </div>
                  <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
                    --{}
                  </span>
                </div>
              </div>
              <Divider className="w-[28.5rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 ml-[-2rem]" />
              <div>
                <Input
                  placeholder="0.00"
                  value={swapData.token1AmountInput}
                  classNames={{
                    base: "h-[2.5rem] text-white",
                    input:
                      "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[10rem]",
                    inputWrapper:
                      "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
                    innerWrapper: "justify-between",
                  }}
                  startContent={
                    <TokenSelect
                      tokenList={swapData.CurrencyList}
                      tokenDisable={swapData.token0}
                      token={swapData.token1}
                      onSelect={setToken1}
                    />
                  }
                />
                <div className="flex justify-between mt-4">
                  <div className="text-white text-opacity-50 flex gap-x-4">
                    <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                      balance: {swapData.token1Balance.toFixed(6)}
                    </span>
                  </div>
                  <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
                    --{}
                  </span>
                </div>
              </div>
            </div>
            {swapData?.token0 && swapData?.token1 && swapData.token1AmountInput !== "" && (
              <div className="w-full mt-[1.18rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] px-5">
                <Accordion selectionMode="single">
                  <AccordionItem
                    key="1"
                    aria-label=""
                    title={
                      <div className="text-white font-avenir font-extrabold text-[0.82rem] leading-[1.18rem] flex gap-2">
                        {`1 ${getTokenSymbol(swapData.token0,chainId)} = ${swapData.exchangeRate} ${getTokenSymbol(swapData.token1,chainId)} `}
                        <span className="font-normal text-white text-opacity-50">{`($1.00)`}</span>
                      </div>
                    }>
                    <Divider className="w-[28.5rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 mt-[-0.5rem] ml-[-1.75rem]" />
                    <div className="flex flex-col gap-y-3 text-white font-avenir font-normal text-[0.82rem] leading-[1.18rem] my-4">
                      <div className="flex justify-between ">
                        <span className="text-opacity-50 text-white flex items-center gap-x-1">
                          Price Impact: <Image alt="notice" src="/images/error.svg" className="w-[1rem] h-[1rem]" />
                        </span>
                        <span className="font-extrabold">
                          {Number(swapData.token0AmountInput)!=0?`${swapData.priceImpact}%`:"---"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-opacity-50 text-white">Refresh Time:</span>
                        <span className="font-extrabold">{countdown}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-opacity-50 text-white">Min.received:</span>
                        <span className="font-extrabold">{Number(swapData.token0AmountInput)!=0?`${swapData.minimalReceive} ${getTokenSymbol(swapData.token1,chainId)}`:"---"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-opacity-50 text-white">Max.Slippage:</span>
                        <span className="font-extrabold">{swapData.slippage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-opacity-50 text-white">Route:</span>
                        <div className="flex font-extrabold">
                          {swapData.tradeRoutePath.map((token, index) => (
                            <a 
                              key={index}
                              href={`https://testnet.bscscan.com/address/${swapData.tradeRouteAddressPath[index]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white"
                            >
                              {index == swapData.tradeRoutePath.length - 1 ? token : token + " -> "}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
            {swapData.isToken0Approved ? swapData.submitButtonStatus === BtnAction.insufficient ? (
                <Button className="bg-button-gradient mt-8 text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                  insufficient token
                </Button>
              ) : (
                <Button
                  onPress={handleSwap}
                  isDisabled={swapData.submitButtonStatus === BtnAction.disable || !swapData.isToken0Approved}
                  isLoading={loading}
                  className="bg-button-gradient mt-8 text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                  Swap
                </Button>
              ) : (
              <Button
                onPress={handleApproveToken0}
                isDisabled={swapData.submitButtonStatus === BtnAction.disable || swapData.isToken0Approved}
                isLoading={isApproveToken0Loading}
                className="bg-button-gradient text-white mt-8 w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                Approve
              </Button>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
//{swapData.submitButtonStatus === BtnAction.disable? "Input Please" :swapData.isToken0Approved ? "Approved" : "Approve Token0"}