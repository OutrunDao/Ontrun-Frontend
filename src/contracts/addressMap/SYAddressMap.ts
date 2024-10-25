import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const SYAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0x645fC1E82a6732196B30C1e8b708267B887ABfCC',
    }
  } as Record<number, ContractAddressMap>;