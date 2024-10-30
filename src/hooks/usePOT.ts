import { POTAbi } from "@/contracts/abis/POT";
import { POT } from "@/contracts/tokens/POT";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { ethers } from "ethers";
import { useState } from "react";
import { createWalletClient, parseEther } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient, useWriteContract } from "wagmi";

export function usePOT() {

    const account = useAccount();
    const publicClient = usePublicClient();

    async function stake({
            POT,
            PT,
            YT,
            SYAmount,
            lockupDays,
            
        }:{
            POT:Currency,
            PT:Currency,
            YT:Currency,
            SYAmount:string,
            lockupDays:number,
        }) {
            
            if (publicClient) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const POTContract = new ethers.Contract((POT as Token).address, POTAbi, signer);
                const tx = await POTContract.stake(parseEther(SYAmount), BigInt(lockupDays), account.address, account.address, account.address);
            }
    }

    async function previewStake({
        POT,
        amountInSY,
        lockupDays,
    }:{
        POT:Currency,
        amountInSY:BigInt,
        lockupDays:BigInt,
    }) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        // const signer = await provider.getSigner();
        const POTContract = new ethers.Contract((POT as Token).address, POTAbi, provider);
        const result = await POTContract.previewStake(amountInSY, lockupDays);
        return result;
    }

    return {
        POTWrite: {
            stake,
        },
        POTRead: {
            previewStake,
        }
    }

}
