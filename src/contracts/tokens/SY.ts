import { Currency, Token } from "@/packages/core";
import { ChainId } from "../chains";
import { SYAddressMap } from "../addressMap/SYAddressMap";

export type SY = {
    chainId: number,
    address: `0x${string}`,
    decimals: number,
    name: string,
    symbol: string,
};

export const SYslisBNB: {[chainId: number]: Token} = {

    [ChainId.BSC_TESTNET]: new Token(
        ChainId.BSC_TESTNET,
        SYAddressMap[ChainId.BSC_TESTNET].slisBNB,
        18,
        'SY-slisBNB',
        'SY Lista slisBNB',
    )
    
}
