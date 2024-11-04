import { YTAbi } from "@/contracts/abis/YT";
import { graphURLMap } from "@/contracts/graphURLs";
import { Currency, Token } from "@/packages/core";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Decimal from "decimal.js-light";
import { ethers, parseEther } from "ethers";
import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { usePublicClient, useChainId } from "wagmi";
import { useSY } from "./useSY";



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

    async function withdrawYields({
        YT,
        amountInBurnedYT,
    }:{
        YT:Currency,
        amountInBurnedYT:BigInt,
    }) {
        if (publicClient) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const YTContract = new ethers.Contract((YT as Token).address, YTAbi, signer);
            const tx = await YTContract.withdrawYields(amountInBurnedYT);
        }
    }

    async function accumulateYields(YT:Currency) {
        if (publicClient) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const YTContract = new ethers.Contract((YT as Token).address, YTAbi, signer);
            const tx = await YTContract.accumulateYields();
        }
    }

    async function amountInYields(YT:Currency) {
        if (!YT || !YT.symbol) return;
        const client = new ApolloClient({
        uri: String(graphURLMap[YT.chainId][YT.symbol]),
        cache: new InMemoryCache()
        });
        const getAmountInYields = gql`
            query getAmountInYields {
                accumulateYields_collection(first: 2, orderBy: blockTimestamp, orderDirection: desc) {
                amountInYields
                blockTimestamp
                protocolFee
                }
              }
        `;
        const Gresult = await client.query({
            query: getAmountInYields,
        })
        return Gresult.data.accumulateYields_collection;
    }

    async function APY({YT, SY}:{YT:Currency, SY:Currency}) {
        const _Principal = await totalSupply(SY);
        const Principal = parseEther(_Principal?.toFixed(18) ?? '0');
        const YieldData = await amountInYields(YT);
        if (!YieldData || YieldData.length < 2) return;
        const Yield = YieldData[0].amountInYields;
        const Time = YieldData[0].blockTimestamp - YieldData[1].blockTimestamp;
        const APS = Yield / ( Number(Principal) * Time);
        const APY = APS * 31536000;
        return (Number(APY)*100 ?? 0).toFixed(3);
    }

    async function previewWithdrawYield({YT,amountInBurnedYT}:{YT:Currency,amountInBurnedYT:BigInt}) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const YTContract = new ethers.Contract((YT as Token).address, YTAbi, provider);
        const result = await YTContract.previewWithdrawYields(amountInBurnedYT);
        return result;
    }

    return {
        YTView: {
            totalSupply,
            currentYields,
            totalRedeemableYields,
            amountInYields,
            APY,
            previewWithdrawYield
        },
        YTWrite: {
            withdrawYields,
            accumulateYields,
        }
    }
}
