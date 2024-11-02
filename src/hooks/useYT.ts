import { YTAbi } from "@/contracts/abis/YT";
import { graphURLMap } from "@/contracts/graphURLs";
import { Currency, Token } from "@/packages/core";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Decimal from "decimal.js-light";
import { ethers } from "ethers";
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
        if (!YT) return;
        const client = new ApolloClient({
        uri: String(graphURLMap[YT.chainId]),
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

    async function getAmountInYields(YT:Currency) {
        const YieldData = await amountInYields(YT);
    }

    return {
        YTView: {
            totalSupply,
            currentYields,
            totalRedeemableYields,
            amountInYields,

        },
        YTWrite: {
            withdrawYields,
            accumulateYields,
        }
    }
}
