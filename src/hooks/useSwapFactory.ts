import { swapFactory } from "@/contracts/abis/swapFactory";
import { ethers } from "ethers";
import { Address } from "viem";

export function useSwapFactory() {
    
    async function swapFeeRate(factoryAddress: Address) {
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const swapFactoryContract = new ethers.Contract(factoryAddress, swapFactory, provider);
        const result = await swapFactoryContract.swapFeeRate();
        return result;
    }

    return {
        swapFactoryView: {
            swapFeeRate,
        }
    }
}