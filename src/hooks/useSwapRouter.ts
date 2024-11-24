import { swapRouter } from "@/contracts/abis/swapRouter";
import { Ether, Token } from "@/packages/core";
import { ethers } from "ethers";
import { Address } from "viem";

export function useSwapRouter() {

    async function getSwapRouterwrite(SwapRouterAddress: Address) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(SwapRouterAddress, swapRouter, signer);
    }

    async function getSwapRouterread(SwapRouterAddress: Address) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        return new ethers.Contract(SwapRouterAddress, swapRouter, provider);
    }

    async function addLiquidity({
        routerAddress,
        tokenAAddress,
        tokenBAddress,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        toAddress,
        deadline,
    }: {
        routerAddress: Address;
        tokenAAddress: string;
        tokenBAddress: string;
        amountADesired: BigInt;
        amountBDesired: BigInt;
        amountAMin: BigInt;
        amountBMin: BigInt;
        toAddress: Address;
        deadline: BigInt;
    }) {
        const swapRouterContract = await getSwapRouterwrite(routerAddress);
        const tx = await swapRouterContract.addLiquidity(
            tokenAAddress,
            tokenBAddress,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            toAddress,
            deadline
        );
        const receipt = await tx.wait();
        return receipt;
    }

    async function addLiquidityETH({
        routerAddress,
        value,
        tokenAddress,
        amountTokenDesired,
        amountTokenMin,
        amountETHMin,
        toAddress,
        deadline,
    }: {
        routerAddress: Address;
        value: BigInt;
        tokenAddress: string;
        amountTokenDesired: BigInt;
        amountTokenMin: BigInt;
        amountETHMin: BigInt;
        toAddress: Address;
        deadline: BigInt;
    }) {
        const swapRouterContract = await getSwapRouterwrite(routerAddress);
        const tx = await swapRouterContract.addLiquidityETH(
            tokenAddress,
            amountTokenDesired,
            amountTokenMin,
            amountETHMin,
            toAddress,
            deadline,
            { value: value }
        );
        const receipt = await tx.wait();
        return receipt;
    }

    async function swapExactTokensForTokens({
        routerAddress,
        amountIn,
        amountOutMin,
        path,
        to,
        referrer,
        deadline,
    }: {
        routerAddress: Address;
        amountIn: BigInt;
        amountOutMin: BigInt;
        path: string[];
        to: Address;
        referrer: Address;
        deadline: BigInt;
    }) {
        console.log([routerAddress, amountIn, amountOutMin, path, to, referrer, deadline]);
        const swapRouterContract = await getSwapRouterwrite(routerAddress);
        const tx = await swapRouterContract.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            referrer,
            deadline,
        );
        const receipt = await tx.wait();
        return receipt;
    }

    async function swapExactETHForTokens({
        routerAddress,
        amountIn,
        amountOutMin,
        path,
        to,
        referrer,
        deadline,
    }: {
        routerAddress: Address;
        amountIn: BigInt;
        amountOutMin: BigInt;
        path: string[];
        to: Address;
        referrer: Address;
        deadline: BigInt;
    }) {
        const swapRouterContract = await getSwapRouterwrite(routerAddress);
        const tx = await swapRouterContract.swapExactETHForTokens(
            amountOutMin,
            path,
            to,
            referrer,
            deadline,
            { value: amountIn }
        );
        const receipt = await tx.wait();
        return receipt;
    }

    async function swapExactTokensForETH({
        routerAddress,
        amountIn,
        amountOutMin,
        path,
        to,
        referrer,
        deadline,
    }: {
        routerAddress: Address;
        amountIn: BigInt;
        amountOutMin: BigInt;
        path: string[];
        to: Address;
        referrer: Address;
        deadline: BigInt;
    }) {
        const swapRouterContract = await getSwapRouterwrite(routerAddress);
        const tx = await swapRouterContract.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            to,
            referrer,
            deadline
        );
        const receipt = await tx.wait();
        return receipt;
    }

    return {
        getSwapRouterwrite,
        swapRouterWrite: {
            addLiquidity,
            addLiquidityETH,
            swapExactTokensForTokens,
            swapExactETHForTokens,
            swapExactTokensForETH,
        }
    }

}