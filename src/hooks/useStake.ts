import { CurrencySelectListType, StakeCurrencyListMap } from "@/contracts/currencys";
import { Currency, Ether, Token } from "@/packages/core";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";
import { POT } from "@/contracts/tokens/POT";
import { useYT } from "@/contracts/useContract/useYT";


export function useStake(tokenName: string) {

  const chainId = useChainId();
  const [NT, setNT] = useState<Currency>();
  const [SY, setSY] = useState<Currency>();
  const [PT, setPT] = useState<Currency>();
  const [YT, setYT] = useState<Currency>();
  const [POT, setPOT] = useState<POT>();
  const [CurrencyList, setCurrencyList] = useState<CurrencySelectListType>();

  const [currentRealRate, setCurrentRealRate] = useState<number>();
  const [anchoredRate, setAnchoredRate] = useState<number>();

  const UseYT = useYT();
  
  useEffect(() => {
    if (!chainId || !tokenName || !StakeCurrencyListMap[chainId]) return;

    // setTokens(StakeCurrencyListMap[chainId]["slisBNB"]);
    const tokens = StakeCurrencyListMap[chainId][tokenName];
    if (tokens) {
      setNT(tokens.NT.onChain(chainId));
      setSY(tokens.SY[chainId]);
      setPT(tokens.PT[chainId]);
      setYT(tokens.YT[chainId]);
      setPOT(tokens.POT[chainId]);
      setCurrencyList([tokens.NT, tokens.RT]);
    }
    
  },[chainId, tokenName])

  useEffect(() => {
    async function _() {
      if (!YT) return;
      return await UseYT.YTView.currentRealRate((YT as Token).address);
    }
    _().then(setCurrentRealRate);
    async function __() {
      if (!YT) return;
      return await UseYT.YTView.anchoredRate((YT as Token).address);
    }
    __().then(setAnchoredRate);
  },[YT])

  return {
    stakeData: {
      currentRealRate,
      anchoredRate,
    }
  }

}