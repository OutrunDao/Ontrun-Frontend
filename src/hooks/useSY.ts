import { SYAbi } from "@/contracts/abis/SY";
import { SY, SYslisBNB } from "@/contracts/tokens/SY";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { useEffect, useState } from "react";
import { PublicClient, formatUnits, parseEther } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";

export function useSY(token:Currency,publicClient:PublicClient,chainId:number) {
    
    // const publicClient = usePublicClient();
    // const chainId = useChainId();

    const [exchangeRate,setExchangeRate] = useState<Decimal>();
    const [totalSupply,settotalSupply] = useState<Decimal>();
    const {data: walletClient} = useWalletClient();
    const account = useAccount();

    async function deposit({
        NT,
        NTAmount,
        SYAmount
    }:{
        NT: Currency,
        NTAmount: string,
        SYAmount: string
    }) {

        if (publicClient) {
            const { request } = await publicClient.simulateContract({
                // @ts-ignore
                address: (token as Token).address,
                abi: SYAbi,
                functionName: 'deposit',
                value: parseEther(NTAmount),
                args: [
                    //@ts-ignore
                    account.address,
                    //@ts-ignore
                    (NT as Token).address,
                    BigInt(+SYAmount*10**18),
                    BigInt(0)
                ],
                account: account.address
              })

            await walletClient?.writeContract(request);

        }
        
    }

    useEffect(() => {
        if (token) {
            async function _exchangeRate() {

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
            _exchangeRate().then(setExchangeRate)
    
            async function _totalSupply() {
    
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
            _totalSupply().then(settotalSupply)
        }
        
    },[token, chainId])

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

export type useSY = ReturnType<typeof useSY>;