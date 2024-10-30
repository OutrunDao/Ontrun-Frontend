import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const SYAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0xa03330c7F7C0a23FA109ad0291ff0f7Dd671C3A8',
    }
  } as Record<number, ContractAddressMap>;