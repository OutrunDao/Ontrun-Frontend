import { Address, PublicClient, WalletClient, getContract } from "viem";
import { UT } from "../abis/UT";

function getUTContract(address: Address, publicClient: PublicClient, wallet?: WalletClient) {
    return getContract({
        abi: UT,
        address,
        client: {
            wallet,
            public: publicClient,
        },
    });
}



export {getUTContract}