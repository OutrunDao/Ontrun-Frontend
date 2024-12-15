import { pairAbi } from "@/contracts/abis/pair";
import { ethers } from "ethers";
import { Address } from "viem";

export function usePair() {

    async function getPairread(pairAddress: Address) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        return new ethers.Contract(pairAddress, pairAbi, provider);
    }

    async function getPairTokens(pairAddress: Address) {
        const pairContract = await getPairread(pairAddress);
        const result = await pairContract.getPairTokens();
        return result;
    }

    return {
        getPairTokens,
    }
}