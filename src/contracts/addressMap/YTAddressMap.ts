import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const YTAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0x3f2d57CE50F5ec7ba4FD198B5c25B3b1a72fF95B',
    }
  } as Record<number, ContractAddressMap>;