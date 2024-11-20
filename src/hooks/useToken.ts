import { erc20 } from "@/contracts/abis/erc20";
import { ethers } from "ethers";
import { Token } from "@/packages/core/entities/token";

export function useToken() {

    async function getToken({
        tokenAddress,
        chainId,
    }:{
        tokenAddress:string
        chainId:number,
    }) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const tokenContract = new ethers.Contract(tokenAddress, erc20, provider);
        const symbol = await tokenContract.symbol();
        const name = await tokenContract.name();
        const decimals = await tokenContract.decimals();
        return new Token(chainId, tokenAddress, decimals, symbol, name);
    }

    return {
        getToken,
    }
    
}