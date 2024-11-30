import { POTAbi } from "@/contracts/abis/POT";
import { SYAbi } from "@/contracts/abis/SY";
import { Currency, Token } from "@/packages/core";
import { Address, encodeFunctionData, parseEther } from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import { ethers } from "ethers";
import { addressMap } from "@/contracts/addressMap/addressMap";
import { multicallAbi } from "@/contracts/abis/multiCall";
import { Target } from "lucide-react";
import { multicall3Abi } from "@/contracts/abis/multiCall3";


export function useMulticall() {

    const chainId = useChainId();

    async function getMulticallwrite() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(addressMap[chainId].multicall, multicall3Abi, signer);
    }

    async function aggregate3(multicallParams: {target:string,callData:string,allowFailure:boolean}[]){
        const multicallContract = await getMulticallwrite();
        console.log(multicallParams);
        const tx = await multicallContract.aggregate3(multicallParams);
        const receipt = await tx.wait();
        return receipt;
    }

    async function aggregate3Value(multicallParams: {target:string,callData:string,value:BigInt,allowFailure:boolean}[],value:BigInt){
        const multicallContract = await getMulticallwrite();
        const tx = await multicallContract.aggregate3Value(multicallParams,{value: value});
        const receipt = await tx.wait();
        return receipt;
    }

    // async function stake({
    //     NT,
    //     PT,
    //     YT,
    //     NTAmount,
    //     SYAmount,
    //     lockupDays,
    // }:{
    //     NT:Currency,
    //     PT:Currency,
    //     YT:Currency,
    //     NTAmount:string,
    //     SYAmount:string,
    //     lockupDays:number,
    // }) {
    //     if (publicClient && account.address) {
    //         // const provider = new ethers.(publicClient.provider);
    //         await window.ethereum.request({ method: 'eth_requestAccounts' });
    //         const provider = new ethers.BrowserProvider(window.ethereum);
    //         const signer = await provider.getSigner();

    //         const SYContract = new ethers.Contract((SY as Token).address, SYAbi, signer);
    //         const POTContract = new ethers.Contract((POT as Token).address, POTAbi, signer);
    //         const multicallContract = new ethers.Contract("0xcA11bde05977b3631167028862bE2a173976CA11", multicall3Abi, signer);

    //         const multicallParams = [
    //             {
    //                 target: (SY as Token).address,
    //                 callData:
    //                 SYContract.interface.encodeFunctionData('deposit', [
    //                     account.address,
    //                     "0x0000000000000000000000000000000000000000",
    //                     parseEther(NTAmount),
    //                     BigInt(0)
    //                 ]),
    //                 value: parseEther(NTAmount),
    //                 allowFailure: false
    //             },
    //             {
    //                 target: (SY as Token).address,
    //                 callData: 
    //                 SYContract.interface.encodeFunctionData('approve', [
    //                     (POT as Token).address,
    //                     parseEther(SYAmount)
    //                 ]),
    //                 value: 0,
    //                 allowFailure: false
    //             },
    //             {
    //                 target: (POT as Token).address,
    //                 callData: 
    //                 POTContract.interface.encodeFunctionData('stake', [
    //                     parseEther(SYAmount),
    //                     BigInt(lockupDays),
    //                     account.address,
    //                     (PT as Token).address,
    //                     (YT as Token).address,
    //                 ]),
    //                 value: 0,
    //                 allowFailure: false
                    
    //             }
    //         ]

    //         const tx = await multicallContract.aggregate3Value(multicallParams, {value: parseEther(NTAmount)});
    //         console.log('Transaction hash:', tx.hash);

    //     }
        
    // }
    
    return {
        aggregate3,
        aggregate3Value,
    }

}