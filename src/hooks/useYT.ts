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
                accumulateYields_collection(orderBy: blockTimestamp, orderDirection: desc) {
                amountInYields
                blockTimestamp
                protocolFee
                syTotalStaking
                }
              }
        `;
        const Gresult = await client.query({
            query: getAmountInYields,
        })
        return Gresult.data.accumulateYields_collection;
    }

    async function APY({YT}:{YT:Currency}) {
        const YieldData = await amountInYields(YT);
        let time = 0;
        let Yield = 0;
        let syTotalStaking = 0;
        let i = 0;
        while (time < 604800 && i < YieldData.length && YieldData.length > 1) {
            time = YieldData[0].blockTimestamp - YieldData[i + 1].blockTimestamp;
            Yield += YieldData[i].amountInYields;
            syTotalStaking += YieldData[i].syTotalStaking;
            i++;
        }
        const aveSYTotalStaking = syTotalStaking / (i+1);
        const APS = Yield / (time*aveSYTotalStaking);
        const APY = APS * 31536000;
        return ethers.formatEther("0");


        
        // if (!YieldData || YieldData.length < 2) return;
        // const Yield = YieldData[0].amountInYields;
        // const Time = YieldData[0].blockTimestamp - YieldData[1].blockTimestamp;
        // const APS = Yield / Time;
        // const APY = APS * 31536000;
        // return ethers.formatEther(APY.toFixed(18));
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
