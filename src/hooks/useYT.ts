import { YTAbi } from "@/contracts/abis/YT";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { usePublicClient, useChainId } from "wagmi";



export function useYT(token:Currency) {
    
    const publicClient = usePublicClient();
    const chainId = useChainId();

    const [totalSupply,setTotalSuppy] = useState<Decimal>();
    const [currentYields,setCurrentYields] = useState<Decimal>();
    const [totalRedeemableYields,setTotalRedeemabkeyields] = useState<Decimal>();

    useEffect(() => {

        if (token?.chainId == chainId) {
            async function _() {

                if (token?.chainId == chainId) {
                    const result = await publicClient?.readContract({
                        // @ts-ignore
                        address: (token as Token).address,
                        abi: YTAbi,
                        functionName: 'totalSupply',
                    })
                    if (result) {
                        return new Decimal(formatUnits(result, token?.decimals))
                    }
                }
            }
            _().then(setTotalSuppy)
    
            async function currentYields() {
    
                if (token?.chainId == chainId) {
                    const result = await publicClient?.readContract({
                        // @ts-ignore
                        address: (token as Token)?.address,
                        abi: YTAbi,
                        functionName: 'currentYields',
                    })
                    if (result) {
                        return new Decimal(formatUnits(result, token?.decimals))
                    }
                }
            }
            currentYields().then(setCurrentYields)
    
            async function totalRedeemableYields() {

                if (token.chainId == chainId) {
                    const result = await publicClient?.readContract({
                        // @ts-ignore
                        address: (token as Token).address,
                        abi: YTAbi,
                        functionName: 'totalRedeemableYields',
                    })
                    if (result) {
                        return new Decimal(formatUnits(result, token?.decimals))
                    }
                }
            }
            totalRedeemableYields().then(setTotalRedeemabkeyields)
        }


    },[token, chainId])

    return {
        YTView: {
            totalSupply,
            currentYields,
            totalRedeemableYields,
        }
    }
}
