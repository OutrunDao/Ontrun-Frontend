import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const POTAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0xDA5744032E53b2451E561B09a823210DF89f8d33',
    }
  } as Record<number, ContractAddressMap>;
