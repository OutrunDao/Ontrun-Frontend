import { SYAbi } from "@/contracts/abis/SY";
import { SY, SYslisBNB } from "@/contracts/tokens/SY";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { useEffect, useState } from "react";
import { PublicClient, createPublicClient, formatUnits, parseEther } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";

export function useSY() {
    
    const publicClient = usePublicClient();
    const chainId = useChainId();

    // const [exchangeRate,setExchangeRate] = useState<Decimal>();
    // const [totalSupply,settotalSupply] = useState<Decimal>();
    const {data: walletClient} = useWalletClient();
    const account = useAccount();

    async function exchangeRate(token: Currency) {

        if (token?.chainId == chainId) {
            const result = await publicClient?.readContract({
                // @ts-ignore
                address: (token as Token)?.address,
                abi: SYAbi,
                functionName: 'exchangeRate',
            })
            if (result) {
                return new Decimal(formatUnits(result, token.decimals))
            }
        }
        
    }

    async function totalSupply(token: Currency) {
    
        if (token?.chainId == chainId) {
            try {
                const result = await publicClient?.readContract({
                    // @ts-ignore
                    address: (token as Token)?.address,
                    abi: SYAbi,
                    functionName: 'totalSupply',
                })
                if (result) {
                    return new Decimal(formatUnits(result, token.decimals))
                }
            } catch{
            }
        }

    }

    async function deposit({
        NT,
        NTAmount,
        SYAmount
    }:{
        NT: Currency,
        NTAmount: string,
        SYAmount: string
    }) {

        if (publicClient && account.address) {

            const { request } = await publicClient.simulateContract({
                // @ts-ignore
                address: (token as Token).address,
                abi: SYAbi,
                functionName: 'deposit',
                value: parseEther(NTAmount),
                args: [
                    account.address,
                    //@ts-ignore
                    "0x0000000000000000000000000000000000000000",
                    parseEther(NTAmount),
                    BigInt(0)
                ],
                account: account.address,
                
            })

            // const { request1 } = await publicClient.simulateContract({
            //     // @ts-ignore
            //     address: (token as Token).address,
            //     abi: SYAbi,
            //     functionName: 'approve',
            //     args: [
                    
            //     ],
            //     account: account.address,
                
            // })

            await walletClient?.writeContract(request);



            // await walletClient?.writeContract({
            //     // @ts-ignore
            //     address: (token as Token).address,
            //     abi: SYAbi,
            //     functionName: 'deposit',
            //     value: parseEther(NTAmount),
            //     args: [
            //         account.address,
            //         //@ts-ignore
            //         (NT as Token).address,
            //         BigInt(+SYAmount*10**18),
            //         BigInt(0)
            //     ],
            //     account: account.address,
            // });

        }
        
    }

    // useEffect(() => {
    //     if (token) {
    //         async function _exchangeRate() {

    //             if (token?.chainId == chainId) {
    //                 const result = await publicClient?.readContract({
    //                     // @ts-ignore
    //                     address: (token as Token)?.address,
    //                     abi: SYAbi,
    //                     functionName: 'exchangeRate',
    //                 })
    //                 if (result) {
    //                     return new Decimal(formatUnits(result, token.decimals))
    //                 }
    //             }
                
    //         }
    //         _exchangeRate().then(setExchangeRate)
    
    //         async function _totalSupply() {
    
    //             if (token?.chainId == chainId) {
    //                 try {
    //                     const result = await publicClient?.readContract({
    //                         // @ts-ignore
    //                         address: (token as Token)?.address,
    //                         abi: SYAbi,
    //                         functionName: 'totalSupply',
    //                     })
    //                     if (result) {
    //                         return new Decimal(formatUnits(result, token.decimals))
    //                     }
    //                 } catch{
    //                 }
    //             }
    
    //         }
    //         _totalSupply().then(settotalSupply)
    //     }
        
    // },[token, chainId])

    return {
        SYView: {
            totalSupply,
            exchangeRate
        },
        SYWrite: {
            deposit,
        }
    }
}
