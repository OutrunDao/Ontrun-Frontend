import { erc20 } from "@/contracts/abis/erc20";
import { ethers } from "ethers";
import { Address } from "viem";

export function useERC20() {
    async function getERC20(ERC20Address: string) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        return new ethers.Contract(ERC20Address, erc20, provider);
    }

    async function approve({
        erc20Address,
        spender,
        amount,
    }: {
        erc20Address: string;
        spender: Address;
        amount: BigInt;
    }) {
        const erc20Contract = await getERC20(erc20Address);
        const tx = await erc20Contract.approve(spender, amount);
        const receipt = await tx.wait();
        return receipt;
    }

    async function allowance({
        ownerAddress,
        spenderAddress,
    }:{
        ownerAddress: Address;
        spenderAddress: Address;
    }) {
        const erc20Contract = await getERC20(ownerAddress);
        const allowance = await erc20Contract.allowance(ownerAddress, spenderAddress);
        return allowance;   
    }

    async function transfer({
        erc20Address,
        to,
        amount,
    }: {
        erc20Address: Address;
        to: Address;
        amount: BigInt;
    }) {
        const erc20Contract = await getERC20(erc20Address);
        const tx = await erc20Contract.transfer(to, amount);
        const receipt = await tx.wait();
        return receipt;
    }

    return {
        ERC20View: {
            allowance,
        },
        ERC20Write: {
            approve,
            transfer,
        }

    };  
}