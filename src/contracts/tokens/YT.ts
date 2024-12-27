import { Currency, Token } from "@/packages/core";
import { ChainId } from "../chains";
import { YTAddressMap } from "../addressMap/OutStakeAddressMap";

export type YT = {
    chainId: number,
    address: `0x${string}`,
    decimals: number,
    name: string,
    symbol: string,
};

export const YTslisBNB: {[chainId: number]: Token} = {

    [ChainId.BSC_TESTNET]: new Token(
        ChainId.BSC_TESTNET,
        YTAddressMap[ChainId.BSC_TESTNET].slisBNB,
        18,
        'YT-slisBNB',
        'Outrun slisBNB Yield Token',
    )
    
}

