import { POTAbi } from "@/contracts/abis/POT";
import { SYAbi } from "@/contracts/abis/SY";
import { Currency, Token } from "@/packages/core";
import { encodeFunctionData, parseEther } from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import { ethers } from "ethers";
import { addressMap } from "@/contracts/addressMap/addressMap";
import { multicallAbi } from "@/contracts/abis/multiCall";
import { Target } from "lucide-react";
import { multicall3Abi } from "@/contracts/abis/multiCall3";


export function useMulticall(SY:Currency,POT:Currency) {
    
    const publicClient = usePublicClient();
    const chainId = useChainId();
    const account = useAccount();

    async function stake({
        NT,
        PT,
        YT,
        NTAmount,
        SYAmount,
        lockupDays,
    }:{
        NT:Currency,
        PT:Currency,
        YT:Currency,
        NTAmount:string,
        SYAmount:string,
        lockupDays:number,
    }) {
        if (publicClient && account.address) {
            // const provider = new ethers.(publicClient.provider);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const SYContract = new ethers.Contract((SY as Token).address, SYAbi, signer);
            const POTContract = new ethers.Contract((POT as Token).address, POTAbi, signer);
            const multicallContract = new ethers.Contract("0xcA11bde05977b3631167028862bE2a173976CA11", multicall3Abi, signer);
            // try {
                // Step 1: Execute the deposit call
                // const depositParams = [
                //     {
                //         target: (SY as Token).address,
                //         callData: SYContract.interface.encodeFunctionData('deposit', [
                //             account.address,
                //             "0x0000000000000000000000000000000000000000",
                //             ethers.parseEther(NTAmount),
                //             BigInt(0)
                //         ]),
                //         value: ethers.parseEther(NTAmount),
                //         allowFailure: false
                //     }
                // ];
                // const depositTx = await multicallContract.aggregate3Value(depositParams,ethers.parseEther(NTAmount));
                // console.log("Deposit transaction sent:", depositTx);
                // await depositTx.wait();
                // console.log("Deposit transaction mined:", depositTx);
            
                // // Step 2: Execute the approve call to trigger MetaMask approval window
                // const approveTx = await SYContract.approve((POT as Token).address, parseEther(SYAmount));
                // console.log("Waiting for approval transaction to be mined...");
                // await approveTx.wait();
                // console.log("Approval transaction mined:", approveTx);
            
                // // Step 3: Execute the stake call
                // const stakeParams = [
                //     {
                //         target: (POT as Token).address,
                //         callData: POTContract.interface.encodeFunctionData('stake', [
                //             parseEther(SYAmount),
                //             BigInt(lockupDays),
                //             account.address,
                //             (PT as Token).address,
                //             (YT as Token).address,
                //         ]),
                //         allowFailure: false
                //     }
                // ];
            
                // const stakeTx = await multicallContract.aggregate3(stakeParams);
                // console.log("Stake transaction sent:", stakeTx);
                // await stakeTx.wait();
                // console.log("Stake transaction mined:", stakeTx);
            
            // } catch (error) {
            //     console.error("Transaction failed:", error);
            // }

            const multicallParams = [
                {
                    target: (SY as Token).address,
                    callData:
                    SYContract.interface.encodeFunctionData('deposit', [
                        account.address,
                        "0x0000000000000000000000000000000000000000",
                        parseEther(NTAmount),
                        BigInt(0)
                    ]),
                    value: parseEther(NTAmount),
                    allowFailure: false
                },
                {
                    target: (SY as Token).address,
                    callData: 
                    SYContract.interface.encodeFunctionData('approve', [
                        (POT as Token).address,
                        parseEther(SYAmount)
                    ]),
                    value: 0,
                    allowFailure: false
                },
                {
                    target: (POT as Token).address,
                    callData: 
                    POTContract.interface.encodeFunctionData('stake', [
                        parseEther(SYAmount),
                        BigInt(lockupDays),
                        account.address,
                        (PT as Token).address,
                        (YT as Token).address,
                    ]),
                    value: 0,
                    allowFailure: false
                    
                }
            ]

            const tx = await multicallContract.aggregate3Value(multicallParams, {value: parseEther(NTAmount)});
            console.log('Transaction hash:', tx.hash);

        }
        
    }
    
    return {
        stake
    }

}