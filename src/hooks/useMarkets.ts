import { ChainId } from "@/contracts/chains";
import { currencySelectList, currencySelectListETH, currencySelectListTBNB, currencySelectListUSDB } from "@/contracts/currencys";
import { USDB, tBNB } from "@/contracts/tokens/tokens";
import { Ether, Token } from "@/packages/core";
import { platform } from "os"
// import { getChainId } from "viem/actions";
import { useChainId, usePublicClient, useReadContract } from "wagmi"
import { UBNB } from "@/contracts/tokens/UPT";
import { readContract } from "viem/actions";
import { config } from "@/contracts/config";
import { UT } from "@/contracts/abis/UT";
import { useEffect, useState } from "react";
import { useUTView } from "./useUT";
import Decimal from "decimal.js-light";
import { useSY } from "./useSY";
import { SYslisBNB } from "@/contracts/tokens/SY";


export function useMarkets() {

    const chainId = useChainId();
    const publicClient = usePublicClient();
    const [result, setResult] = useState<Decimal>();
    // @ts-ignore
    const SYSlisBNB = useSY(SYslisBNB[chainId],publicClient,chainId);
    // const UBNBView = useUTView(UBNB[chainId]);

    
    

    // useEffect(() => {
        
    //     async function _() {
    //         return await (UBNB[chainId] as Token)?.totalSupply(publicClient)
    //         // return UBNBView.UTView.symbol;
    //     }
    //     _().then(setResult)

    // },[chainId])

    
    // const marketData = [
    //     { name: 'Blast ETH', icon: '🔹', platform: 'Blast', liquidity: 71175091, currentlyAnchoredAPY: 7.9, averageLockTime: '235 days', days: 235 },
    //     { name: 'USDB', icon: '💲', platform: 'Blast', liquidity: 16498710, currentlyAnchoredAPY: 5.8, averageLockTime: '112 days', days: 112 },
    //   ]


    switch (chainId) {
        case ChainId.BSC_TESTNET:
            // const _UBNB = { name: 'UBNB', icon: '🔹', platform: 'BSC Test Net', liquidity: 71175091, currentlyAnchoredAPY: 7.9, averageLockTime: '235 days', days: 235, currencySelectList: currencySelectListTBNB}
            const _BNB = { name: 'slisBNB', icon: '🔹', platform: 'BSC Test Net', liquidity: SYSlisBNB.SYView.totalSupply?.toFixed(6), currentlyAnchoredAPY: 7.9, averageLockTime: '235 days', days: 235, currencySelectList: currencySelectListTBNB}
            return { marketsData: [ _BNB ] }
            break
        case ChainId.BLAST_SEPOLIA:
            const _ETH = { name: 'Blast ETH', icon: '🔹', platform: 'Blast', liquidity: 16498710, currentlyAnchoredAPY: 7.9, averageLockTime: '235 days', days: 235, currencySelectList: currencySelectListETH}
            const _USDB = { name: 'USDB', icon: '💲', platform: 'Blast', liquidity: 16498710, currentlyAnchoredAPY: 5.8, averageLockTime: '112 days', days: 112, currencySelectList: currencySelectListUSDB}        
            return { marketsData: [ _ETH, _USDB, ] }
            break
        default:
            return { marketsData: [] }

    }

}