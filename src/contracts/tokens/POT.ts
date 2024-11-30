import { Currency, Token } from "@/packages/core";
import { POTAddressMap } from "../addressMap/POTAddressMap";
import { ChainId } from "../chains";
import { graphURLMap } from "../graphURLs";
import { useYT } from "@/contracts/useContract/useYT";
import { YTslisBNB } from "./YT";
import { SYslisBNB } from "./SY";

export type POT = {
    chainId: number,
    address: `0x${string}`,
    decimals: number,
    symbol: string,
    name: string,
    RTSymbol: string,
    graphURL?: string,
    SY: Currency,
    YT: Currency,
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
        SY: SYslisBNB[ChainId.BSC_TESTNET],
        YT: YTslisBNB[ChainId.BSC_TESTNET],
    }

}
