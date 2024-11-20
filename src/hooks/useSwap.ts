import { addressMap, getFactoryAddresses, getRouterAddresses } from "@/contracts/addressMap/addressMap";
import { SUPPORTED_CHAINS } from "@/contracts/chains";
import { Currency, CurrencyAmount, Ether, Percent, Token, TradeType } from "@/packages/core";
import { Native, Pair, Trade } from "@/packages/sdk";
import { Fetcher } from "@/packages/sdk/fetcher";
import { useQuery } from "@tanstack/react-query";
import Decimal from "decimal.js-light";
import { debounce, map, set } from "radash";
import { useEffect, useMemo, useState } from "react";
import { Address, PublicClient, parseUnits } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import useContract from "./useContract";
import { CurrencySelectListType, getBaseCurrencyList, getSwapCurrencyList } from "@/contracts/currencys";
import { useSwapFactory } from "./useSwapFactory";
import { useERC20 } from "./useERC20";
import { useSwapRouter } from "./useSwapRouter";

export enum BtnAction {
  disable,
  insufficient,
  disconnect,
  available,
  approve,
  invalidPair,
}

export enum SwapView {
  swap,
  addLiquidity,
  createPoll,
  mint,
}

export type SwapOptions = {
  getTradeRoute?: boolean;
  fetchPair?: boolean;
  view: SwapView;
  approve2Tokens?: boolean;
};

function tokenConvert(token: Currency): Token {
  // if (token.equals(USDB[token.chainId])) return ORUSD[token.chainId];
  // console.log("token", token);
  return token.isNative ? Native.onChain(token.chainId).wrapped : (token as Token);
}

async function makePairs(tokenA: Currency, tokenB: Currency, publicClient: PublicClient): Promise<Pair[]> {
  const chainId = publicClient.chain!.id;
  let pairs: Pair[] = [];
  if (!tokenA || !tokenB) console.error("tokenA or tokenB is not defined");

  for (let i = 0;i < getFactoryAddresses(chainId).length;i++) {
    console.log("getFactoryAddresses(chainId)[i]", i, getFactoryAddresses(chainId)[i]);
    const swapFeeRate = await useSwapFactory().swapFactoryView.swapFeeRate(getFactoryAddresses(chainId)[i]);
    let p = await Fetcher.fetchPairData(tokenConvert(tokenA), tokenConvert(tokenB), publicClient,  swapFeeRate, getFactoryAddresses(chainId)[i]);
    if (p) pairs.push(p);
    for (let j = 0; j < getBaseCurrencyList(chainId).length; j++) {
      if (!tokenA.equals(getBaseCurrencyList(chainId)[j][chainId])) {
        p = await Fetcher.fetchPairData(tokenConvert(getBaseCurrencyList(chainId)[j][chainId]), tokenConvert(tokenA), publicClient, swapFeeRate, getFactoryAddresses(chainId)[i]);
        if (p) pairs.push(p);
      };
      if (!tokenB.equals(getBaseCurrencyList(chainId)[j][chainId])) {
        p = await Fetcher.fetchPairData(tokenConvert(getBaseCurrencyList(chainId)[j][chainId]), tokenConvert(tokenB), publicClient, swapFeeRate, getFactoryAddresses(chainId)[i]);
        if (p) pairs.push(p);
      };
    }
  }

  console.log("pairs", pairs);
  const uniquePairs = pairs.filter((pair, index, self) =>
    index === self.findIndex((p) => (
      p.token0.equals(pair.token0) && p.token1.equals(pair.token1)
    ))
  );
  console.log("uniquePairs", uniquePairs);
  return uniquePairs;
}

export function useSwap(swapOpts: SwapOptions) {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const [token0, setToken0] = useState<Currency | Ether>();
  const [token1, setToken1] = useState<Currency | Ether>();
  const [token0AmountInput, setToken0AmountInput] = useState<string>("");
  const [token1AmountInput, setToken1AmountInput] = useState<string>("");
  const [routeNotExist, setRouteNotExist] = useState<boolean>(false);
  const [slippage, setSlippage] = useState(0.5);
  const [token0Balance, setToken0Balance] = useState<Decimal>(new Decimal(0));
  const [token1Balance, setToken1Balance] = useState<Decimal>(new Decimal(0));
  const [tradeType, setTradeType] = useState<TradeType>(TradeType.EXACT_INPUT);
  const [transactionDeadline, setTransactionDeadline] = useState<number>(10);
  const [unlimitedAmount, setUnlimitedAmount] = useState<boolean>(false);
  const [CurrencyList, setCurrencyList] = useState<CurrencySelectListType>();
  const [swapFeeRate, setswapFeeRate] = useState<number>();
  // const [factoryAddress, setFactoryAddress] = useState<Address>();
  const [routerAddress, setRouterAddress] = useState<Address>();
  const [isToken0Approved, setIsToken0Approved] = useState<boolean>(false);
  const [isToken1Approved, setIsToken1Approved] = useState<boolean>(false);

  const UseERC20 = useERC20();
  const UseSwapRouter = useSwapRouter();

  const { data: pair } = useQuery({
    queryKey: ["queryPair", chainId, token0?.name, token1?.name, swapOpts.fetchPair],
    queryFn: async (): Promise<Pair | null> => {
      if (swapOpts.fetchPair || !token0 || !token1 || !publicClient) return null;
      return await Fetcher.fetchPairData(tokenConvert(token0), tokenConvert(token1), publicClient).catch((e) => null);
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [tradeRoute, setTradeRoute] = useState<Trade<Currency, Currency, TradeType>>();
  const { write: writeContract } = useContract();
  const V2_ROUTER_ADDRESSES = useMemo(() => {
    return addressMap[chainId].SWAP_ROUTER;
  }, [chainId]);

  useEffect(() => {
    if (!chainId) return;
    setCurrencyList(getSwapCurrencyList(chainId));
  },[chainId]);

  useEffect(() => {
    async function _() {
      if (!account.address || !token1 || !publicClient) return new Decimal(0);
      return token1.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _().then(setToken1Balance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account.address, token1?.name]);

  useEffect(() => {
    async function _() {
      if (!account.address || !token0 || !publicClient) return new Decimal(0);
      return token0.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _().then(setToken0Balance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account.address, token0?.name]);

  // useEffect(() => {
  //   async function _() {
  //     token0AmountInputHandler(token0AmountInput);
  //   }
  // },[token0AmountInput]);

  useEffect(() => {
    setToken0AmountInput("");
    setToken1AmountInput("");
    setTradeRoute(undefined);
    setRouteNotExist(false);
  }, [token0?.name, token1?.name]);

  useEffect(() => {
    async function _() {
      if (!token0 || !token1 || !routerAddress || !account.address) return;
      if (token0.isNative) {
        setIsToken0Approved(true);
        const _result = await (token1 as Token).allowance(account.address, routerAddress, publicClient!)
        if (_result.lessThan(token1AmountInput || 0)) {
          setIsToken1Approved(false);
        } else{
          setIsToken1Approved(true);
        }
      } else if (token1.isNative) {
        setIsToken1Approved(true);
        const _result = await (token0 as Token).allowance(account.address, routerAddress, publicClient!)
        if (_result.lessThan(token0AmountInput || 0)) {
          setIsToken0Approved(false);
        } else{
          setIsToken0Approved(true);
        }
      } else {
        const _result0 = await (token0 as Token).allowance(account.address, routerAddress, publicClient!)
        const _result1 = await (token1 as Token).allowance(account.address, routerAddress, publicClient!)
        if (_result0.lessThan(token0AmountInput || 0)) {
          setIsToken0Approved(false);
        } else{
          setIsToken0Approved(true);
        }
        if (_result1.lessThan(token1AmountInput || 0)) {
          setIsToken1Approved(false);
        } else{
          setIsToken1Approved(true);
        }
      }
    }
    _();
  },[token0AmountInput, token1AmountInput, token0, token1, routerAddress, account]);

  useEffect(() => {
    if (!swapFeeRate) return;
    switch (swapFeeRate) {
      case 0.3:
        setRouterAddress(getRouterAddresses(chainId)[0]);
        break;
      case 1:
        setRouterAddress(getRouterAddresses(chainId)[1]);
        break;
    }
  }, [swapFeeRate]);



  const priceImpact = useMemo(() => {
    return tradeRoute && tradeRoute.priceImpact.toFixed();
  }, [tradeRoute]);
  const exchangeRate = useMemo(() => {
    return tradeRoute && tradeRoute.executionPrice.toFixed();
  }, [tradeRoute]);
  const minimalReceive = useMemo(() => {
    return tradeRoute && tradeRoute.minimumAmountOut(new Percent(slippage * 10, 1000)).toFixed(6); 
    // return tradeRoute && tradeRoute.minimumAmountOut(new Percent(slippage, 100)).toFixed(6);//slippage不能<1
  }, [tradeRoute, slippage]);
  const tradeRoutePath = useMemo(() => {
    return (
      tradeRoute &&
      tradeRoute.route.path
        .map((token, index) => {
          if (index === 0) return token0?.symbol;
          if (index === tradeRoute.route.path.length - 1) return token1!.symbol;
          return token.symbol;
        })
        .join(" -> ")
    );
  }, [tradeRoute, token0, token1]);

  const isTransformView = useMemo(() => {
    if (!token0 || !token1) return false;
    // if (token0.isNative && token1.equals(ORETH[chainId])) return true;
    // if (token1.isNative && token0.equals(ORETH[chainId])) return true;
    // if (token0.equals(USDB[chainId]) && token1.equals(ORUSD[chainId])) return true;
    // if (token1.equals(USDB[chainId]) && token0.equals(ORUSD[chainId])) return true;
    return false;
  }, [chainId, token0, token1]);

  const submitButtonStatus = useMemo(() => {
    if (!chainId || !SUPPORTED_CHAINS.includes(chainId)) return BtnAction.disconnect;
    if ([SwapView.addLiquidity, SwapView.createPoll].includes(swapOpts.view) && isTransformView) {
      return BtnAction.invalidPair;
    }
    if (!token0 || !token1 || !token0AmountInput || !token1AmountInput || !routerAddress) {
      return BtnAction.disable;
    }

    try {
      if (swapOpts.view === SwapView.swap) {
        if (!tradeRoute && !isTransformView) return BtnAction.disable;
        if (priceImpact && +priceImpact >= 20) return BtnAction.disable;
        if (tradeType === TradeType.EXACT_INPUT && token0Balance.lt(token0AmountInput)) return BtnAction.insufficient;
        if (tradeType === TradeType.EXACT_OUTPUT && token1Balance.lt(token1AmountInput)) return BtnAction.insufficient;
      } else if (swapOpts.view === SwapView.mint) {
        if (token0Balance.lt(token0AmountInput)) return BtnAction.insufficient;
      } else {
        if (token0Balance.lt(token0AmountInput) || token1Balance.lt(token1AmountInput)) return BtnAction.insufficient;
      }
    } catch (e) {
      return BtnAction.disable;
    }

    return BtnAction.available; 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chainId,
    token0,
    token1,
    token0Balance,
    token1Balance,
    token0AmountInput,
    token1AmountInput,
    tradeRoute,
    swapOpts.view,
    priceImpact,
  ]);

  async function approveToken0() {
    if (!account.address) return console.log("wallet account is not connected");
    if (!token0 || !routerAddress) return;
    if (token0.isNative) return;
    const allowanceToken0 = await (token0 as Token).allowance(account.address, routerAddress, publicClient!);
    if (allowanceToken0.lessThan(token0AmountInput || 0)) {
      const receipt = await UseERC20.ERC20Write.approve({
        erc20Address: (token0 as Token).address,
        spender: routerAddress,
        amount: parseUnits(token0AmountInput!.toString(), token0.decimals),
      });
      return receipt;
    }
  }

  async function approveToken1() {
    if (!account.address) return console.log("wallet account is not connected");
    if (!token1 || !routerAddress) return;
    if (token1.isNative) return;
    const allowanceToken1 = await (token1 as Token).allowance(account.address, routerAddress, publicClient!);
    if (allowanceToken1.lessThan(token1AmountInput || 0)) {
      const receipt = await UseERC20.ERC20Write.approve({
        erc20Address: (token1 as Token).address,
        spender: routerAddress,
        amount: parseUnits(token1AmountInput!.toString(), token1.decimals),
      });
      return receipt;
    }
  }

  async function addLiquidity() {
    if (!account.address) return console.log("wallet account is not connected");
    if (!token0 || !token1 || !routerAddress) return;
    const deadline = Math.floor(Date.now() / 1000) + transactionDeadline * 60;
    const token0AmountInputMin = Number(token0AmountInput)*(1-slippage)/100;
    const token1AmountInputMin = Number(token1AmountInput)*(1-slippage)/100;
    if (token0.isNative) {
      const receipt = await UseSwapRouter.swapRouterWrite.addLiquidityETH({
        routerAddress: routerAddress,
        value: parseUnits(token0AmountInput!.toString(), token0.decimals),
        tokenAddress: (token1 as Token).address,
        amountTokenDesired: parseUnits(token1AmountInput!.toString(), token1.decimals),
        amountTokenMin: parseUnits(token1AmountInputMin!.toString(), token1.decimals),
        amountETHMin: parseUnits(token0AmountInputMin!.toString(), token0.decimals),
        toAddress: account.address,
        deadline: BigInt(deadline),
      });
      return receipt;
    } else if (token1.isNative) {
      const receipt = await UseSwapRouter.swapRouterWrite.addLiquidityETH({
        routerAddress: routerAddress,
        value: parseUnits(token1AmountInput!.toString(), token1.decimals),
        tokenAddress: (token0 as Token).address,
        amountTokenDesired: parseUnits(token0AmountInput!.toString(), token0.decimals),
        amountTokenMin: parseUnits(token0AmountInputMin!.toString(), token0.decimals),
        amountETHMin: parseUnits(token1AmountInputMin!.toString(), token1.decimals),
        toAddress: account.address,
        deadline: BigInt(deadline),
      });
      return receipt;
    } else {
      const receipt = await UseSwapRouter.swapRouterWrite.addLiquidity({
        routerAddress: routerAddress,
        tokenAAddress: (token0 as Token).address,
        tokenBAddress: (token1 as Token).address,
        amountADesired: parseUnits(token0AmountInput!.toString(), token0.decimals),
        amountBDesired: parseUnits(token1AmountInput!.toString(), token1.decimals),
        amountAMin: parseUnits(token0AmountInputMin!.toString(), token0.decimals),
        amountBMin: parseUnits(token1AmountInputMin!.toString(), token1.decimals),
        toAddress: account.address,
        deadline: BigInt(deadline),
      })
      return receipt;
    }
  }

  async function setSwapDataWhenInput(tradeType: TradeType, value: string) {
    setRouteNotExist(false);
    if (isTransformView) {
      setTradeRoute(undefined);
      tradeType === TradeType.EXACT_INPUT ? setToken1AmountInput(value) : setToken0AmountInput(value);
      return;
    }

    if (swapOpts.view === SwapView.addLiquidity) {
      if (pair && token0 && token1) {
        const price = pair.priceOf(tokenConvert(tradeType === TradeType.EXACT_INPUT ? token0! : token1!));
        tradeType === TradeType.EXACT_INPUT
          ? setToken1AmountInput((+price.toSignificant(6) * +value).toFixed(6))
          : setToken0AmountInput((+price.toSignificant(6) * +value).toFixed(6));
      }
      return;
    }
    if (swapOpts.view === SwapView.swap) {
      if (!publicClient) return;
      if (tradeType === TradeType.EXACT_INPUT) {
        // console.log("token0", tokenConvert(token0!));
        const result = Trade.bestTradeExactIn(
          await makePairs(token0!, token1!, publicClient),
          CurrencyAmount.fromRawAmount(tokenConvert(token0!), parseUnits(value, token0!.decimals).toString()),
          tokenConvert(token1!),
          { maxNumResults: 3 },
        );
        if (!result || !result.length) {
          setTradeRoute(undefined);
          setRouteNotExist(true);
          return setToken1AmountInput("");
        }
        setToken1AmountInput(result[0].outputAmount.toFixed(8));
        setTradeRoute(result[0]);
        for (let i = 0; i < result.length; i++) {
          console.log(`result[${i}]`, result[i].outputAmount.toFixed(8));
        }
      } else {
        const result = Trade.bestTradeExactOut(
          await makePairs(token0!, token1!, publicClient!),
          tokenConvert(token0!),
          CurrencyAmount.fromRawAmount(tokenConvert(token1!), parseUnits(value, token1!.decimals).toString()),
          {
            maxNumResults: 3,
          },
        );
        if (!result || !result.length) {
          setTradeRoute(undefined);
          setRouteNotExist(true);
          return setToken0AmountInput("");
        }
        setToken0AmountInput(result[0].inputAmount.toFixed(8));
        setTradeRoute(result[0]);
        console.log("result[]", result);
      }
    }
  }
  const debouncedSetSwapDataWhenInput = debounce({ delay: 500 }, setSwapDataWhenInput);

  async function token0AmountInputHandler(value: string) {
    setToken0AmountInput(value);
    setToken1AmountInput("");
    setTradeType(TradeType.EXACT_INPUT);
    if (!value || !token0 || isNaN(+value) || +value <= 0) return;
    if (!token1 || !publicClient) return;
    debouncedSetSwapDataWhenInput.cancel();
    debouncedSetSwapDataWhenInput(TradeType.EXACT_INPUT, value);
  }
  async function token1AmountInputHandler(value: string) {
    setToken1AmountInput(value);
    setTradeType(TradeType.EXACT_OUTPUT);
    if (!value || !token1 || isNaN(+value)) return;
    if (!token0 || !publicClient) return;
    debouncedSetSwapDataWhenInput.cancel();
    debouncedSetSwapDataWhenInput(TradeType.EXACT_OUTPUT, value);
  }

  async function maxHandler(flag: number) {
    if (flag === 0) {
      return token0AmountInputHandler(token0Balance.toString());
    }
    return token1AmountInputHandler(token1Balance.toString());
  }

  async function updateTokenBalance() {
    if (!account.address || !token1 || !token0 || !publicClient) return new Decimal(0);
    const ba0 = await token0.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    const ba1 = await token1.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    setToken1Balance(ba1);
    setToken0Balance(ba0);
  }
 
  return {
    swapData: {
      token0,
      token1,
      token0Balance,
      token1Balance,
      token0AmountInput,
      token1AmountInput,
      pair,
      tradeRoute,
      tradeRoutePath,
      minimalReceive,
      submitButtonStatus,
      priceImpact,
      routeNotExist,
      isTransformView,
      exchangeRate,
      slippage,
      transactionDeadline,
      unlimitedAmount,
      CurrencyList,
      swapFeeRate,
      isToken0Approved,
      isToken1Approved,

    },
    loading,
    setLoading,
    setToken0,
    setToken1,
    setToken0AmountInput,
    setToken1AmountInput,
    setSlippage,
    setTransactionDeadline,
    setUnlimitedAmount,
    updateTokenBalance,
    token0AmountInputHandler,
    token1AmountInputHandler,
    maxHandler,
    setCurrencyList,
    setswapFeeRate,
    approveToken0,
    approveToken1,
    addLiquidity,

  };
}
