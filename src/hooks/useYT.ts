import { YTAbi } from "@/contracts/abis/YT";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { usePublicClient, useChainId } from "wagmi";



export function useYT() {
    
    const publicClient = usePublicClient();
    const chainId = useChainId();



    async function totalSupply(token: Currency) {

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

    async function currentYields(token: Currency) {
    
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

    async function totalRedeemableYields(token: Currency) {

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

    return {
        YTView: {
            totalSupply,
            currentYields,
            totalRedeemableYields,
        }
    }
}
