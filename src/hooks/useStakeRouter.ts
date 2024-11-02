
import { addressMap } from "@/contracts/addressMap/addressMap";
import { ethers, parseEther } from "ethers";
import { usePublicClient, useChainId, useAccount } from "wagmi";
import { stakeRouterAbi } from "@/contracts/abis/stakeRouter";

export  function useStakeRouter() {

    const publicClient = usePublicClient();
    const chainId = useChainId();
    const account = useAccount();

    async function mintYieldTokensFromToken({
        SYAddress,
        POTAddress,
        TokenInAddress,
        tokenAmount,
        lockupDays,
        minPTGenerated,
        value,
    }:{
        SYAddress:string,
        POTAddress:string,
        TokenInAddress:string,
        tokenAmount:BigInt,
        lockupDays:BigInt,
        minPTGenerated:BigInt,
        value?:BigInt,
    }) {
        if (publicClient && account.address) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const stakeRouterContract = new ethers.Contract(addressMap[chainId].stakeRouter, stakeRouterAbi, signer);
            const tx = await stakeRouterContract.mintYieldTokensFromToken(
                SYAddress,
                POTAddress,
                TokenInAddress,
                tokenAmount,
                [
                    lockupDays,
                    minPTGenerated,
                    account.address,
                    account.address,
                    account.address,
                ],
                { value : value }
            );
            const receipt = await tx.wait();
            return receipt;
        }
    }

    async function redeemPPToToken({
        SYAddress,
        PTAddress,
        UPTAddress,
        POTAddress,
        tokenOutAddress,
        receiverAddress,
        positionId,
        positionShare,
        minRedeemedSyAmount,
    }:{
        SYAddress:string,
        PTAddress:string,
        UPTAddress:string,
        POTAddress:string,
        tokenOutAddress:string,
        receiverAddress:string,
        positionId:BigInt,
        positionShare:BigInt,
        minRedeemedSyAmount:BigInt,
    }) {
        
    }

    return {
        mintYieldTokensFromToken,
    }
}