import { Token } from "@/packages/core";
import { POTAddressMap } from "../addressMap/POTAddressMap";
import { ChainId } from "../chains";

export type POT = {
    chainId: number,
    address: `0x${string}`,
    decimals: number,
    name: string,
    symbol: string,
};

export const POTslisBNB: {[chainId: number]: Token} = {

    [ChainId.BSC_TESTNET]: new Token(
        ChainId.BSC_TESTNET,
        POTAddressMap[ChainId.BSC_TESTNET].slisBNB,
        18,
        'POT-slisBNB',
        'SlisBNB Position Option Token',
    ),

}