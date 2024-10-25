import { POTAbi } from "@/contracts/abis/POT";
import { POT } from "@/contracts/tokens/POT";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { useState } from "react";
import { createWalletClient } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient, useWriteContract } from "wagmi";

export function usePOT(token:Currency) {

    const account = useAccount();
    const publicClient = usePublicClient();
    // const {isPending, writeContract} = useWriteContract();
    const {data: walletClient} = useWalletClient();
    const [isPending , setIsPending] = useState(false);

    async function stake({
            PT,
            YT,
            SYAmount,
            lockupDays,
            
        }:{
            PT:Currency,
            YT:Currency,
            SYAmount:string,
            lockupDays:number,
        }) {
            
            if (publicClient) {
                const { request } = await publicClient.simulateContract({
                    // @ts-ignore
                    address: (token as Token).address,
                    abi: POTAbi,
                    functionName: 'stake',
                    args: [
                        BigInt(+SYAmount*10**18),
                        BigInt(lockupDays),
                        // @ts-ignore
                        account.address,
                        // @ts-ignore
                        (PT as Token).address,
                        // @ts-ignore
                        (YT as Token).address,
                    ],
                    account: account.address
                  })
    
                await walletClient?.writeContract(request);

                
                setIsPending(true);
            }
            
    }

    return {
        POTWrite: {
            stake,
            isPending,
        }
    }

}

// writeContract({
            //     abi: POTAbi,
            //     // @ts-ignore
            //     address: (token as Token).address,
            //     functionName: 'stake',
            //     args: [
            //         BigInt(SYAmount),
            //         BigInt(lockupDays),
            //         // @ts-ignore
            //         account.address,
            //         // @ts-ignore
            //         (PT as Token).address,
            //         // @ts-ignore
            //         (YT as Token).address,
            //     ]
            // })