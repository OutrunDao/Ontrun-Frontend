import { ChainNames } from "@/contracts/chains";
import { StakeCurrencyListMap, currencySelectList, currencySelectListETH, currencySelectListTBNB, currencySelectListUSDB } from "@/contracts/currencys";
// import { getChainId } from "viem/actions";
import { useChainId, usePublicClient} from "wagmi"
import { useEffect, useMemo, useState } from "react";
import { useSY } from "./useSY";
import { getTokensByChainId } from "@/contracts/tokens/tokenStake";
import { Currency } from "@/packages/core";
import { set } from "radash";
import { useYT } from "./useYT";

/* eslint-disable no-unused-vars */

export function useMarkets() {

    const chainId = useChainId();
    const publicClient = usePublicClient();
    const tokensOnChain = useMemo(() => getTokensByChainId(chainId), [chainId]);
    const [ liquiditys, setLiquiditys ] = useState<any[]>([]);
    const [ APYs, setAPYs ] = useState<any[]>([]);
    const [ SYs,setSYs ] = useState<any[]>([]);
    const [ YTs,setYTs ] = useState<any[]>([]);
    const [SY,setSY] = useState<Currency>();
    const UseSY = useSY();
    const UseYT = useYT();
    const [ marketDatas, setMarketDatas ] = useState<any[]>([]);

    function refreshSYsYTs() {
        async function _SYs() {
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
        _SYs().then(setSYs);

        async function _YTs() {
            const _YTs = [];
            for (let i = 0; i < tokensOnChain.length; i++) {
                const token = tokensOnChain[i];
                if (token.symbol) {
                    const YT = StakeCurrencyListMap[chainId][token.symbol].YT[chainId];
                    _YTs.push(YT);
                }
            }
            return _YTs;
        }
        _YTs().then(setYTs);
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

    function refreshAPY() {
        
        async function _() {
            const _APYs = [];
            for (let i = 0; i < SYs.length; i++) {
                setSY(SYs[i]);
                const APY = await UseYT.YTView.APY({YT:YTs[i],SY:SYs[i]});
                _APYs.push(APY);
            }
            return _APYs;
        }
        _().then(setAPYs);
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
                    currentlyAnchoredAPY: APYs[i],
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
        refreshSYsYTs();
    },[chainId, tokensOnChain])

    useEffect(() => {
        refreshLiquiditys();
        refreshAPY();
    },[chainId, SYs, YTs])

    useEffect(() => {
        refresh();
    },[chainId, liquiditys, APYs])

    return { marketsData: marketDatas, refresh, refreshSYsYTs, refreshLiquiditys, refreshAPY };

}
