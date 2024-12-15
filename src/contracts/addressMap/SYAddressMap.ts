import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const SYAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0xA51A28C628ee5aA25A1AE3eC911DA54028A39332',
    }
  } as Record<number, ContractAddressMap>;