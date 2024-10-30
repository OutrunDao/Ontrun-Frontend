import { ChainNames } from "@/contracts/chains";
import { StakeCurrencyListMap, currencySelectList, currencySelectListETH, currencySelectListTBNB, currencySelectListUSDB } from "@/contracts/currencys";
// import { getChainId } from "viem/actions";
import { useChainId, usePublicClient} from "wagmi"
import { useEffect, useMemo, useState } from "react";
import { useSY } from "./useSY";
import { getTokensByChainId } from "@/contracts/tokens/tokenStake";
import { Currency } from "@/packages/core";
import { set } from "radash";

/* eslint-disable no-unused-vars */

export function useMarkets() {

    const chainId = useChainId();
    const publicClient = usePublicClient();
    const tokensOnChain = useMemo(() => getTokensByChainId(chainId), [chainId]);
    const [ liquiditys, setLiquiditys ] = useState<any[]>([]);
    const [ SYs,setSYs ] = useState<any[]>([]);
    const [SY,setSY] = useState<Currency>();
    const UseSY = useSY();
    const [ marketDatas, setMarketDatas ] = useState<any[]>([]);

    function refreshSYs() {
        async function _() {
            const _SYs = [];
            for (let i = 0; i < tokensOnChain.length; i++) {
                const token = tokensOnChain[i];
                if (token.symbol) {
                    const SY = StakeCurrencyListMap[chainId][token.symbol].SY[chainId];
                    _SYs.push(SY);
                }
            }
            return _SYs;
        }
        _().then(setSYs);
    }

    function refreshLiquiditys() {
        
        async function _() {
            const _liquiditys = [];
            for (let i = 0; i < SYs.length; i++) {
                setSY(SYs[i]);
                const liquidity = await UseSY.SYView.totalSupply(SYs[i]);
                _liquiditys.push(liquidity?.toFixed(6));
            }
            return _liquiditys;
        }
        _().then(setLiquiditys);
    }

    function refresh() {

        async function _() {

            const _marketDatas: any[] = [];
            for (let i = 0; i < tokensOnChain.length; i++) {
                const token = tokensOnChain[i];
                if (token.symbol && token.name) {
                    const marketData = {
                    name: token.name,
                    symbol: token.symbol,
                    icon: '🔹',
                    platform: ChainNames[chainId],
                    liquidity: liquiditys[i],
                    currentlyAnchoredAPY: 7.9,
                    averageLockTime: SYs[i]?.symbol,
                    days: 235,
                    currencySelectList: StakeCurrencyListMap[chainId][token.symbol]
                    }
                    _marketDatas.push(marketData);
                }
            }
            return _marketDatas;
        }
        _().then(setMarketDatas);
    }

    useEffect(() => {
        refreshSYs();
    },[chainId, tokensOnChain])

    useEffect(() => {
        refreshLiquiditys();
    },[chainId, SYs])

    useEffect(() => {
        refresh();
    },[chainId, liquiditys])

    return { marketsData: marketDatas, refresh, refreshSYs, refreshLiquiditys };

}
