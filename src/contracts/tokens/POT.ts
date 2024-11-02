import { Token } from "@/packages/core";
import { POTAddressMap } from "../addressMap/POTAddressMap";
import { ChainId } from "../chains";
import { graphURLMap } from "../graphURLs";

export type POT = {
    chainId: number,
    address: `0x${string}`,
    decimals: number,
    symbol: string,
    name: string,
    RTSymbol: string,
    graphURL?: string,
};

export const POTslisBNB: {[chainId: number]: POT} = {

    [ChainId.BSC_TESTNET]: {
        chainId: ChainId.BSC_TESTNET,
        address: POTAddressMap[ChainId.BSC_TESTNET].slisBNB,
        decimals: 18,
        symbol: "POT-slisBNB",
        name: "SlisBNB Position Option Token",
        RTSymbol: "slisBNB",
        graphURL: graphURLMap[ChainId.BSC_TESTNET].POTslisBNB,
    }

}
