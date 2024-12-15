import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const YTAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0x3cf002ddF720795Cd169804779D5A33589008628',
    }
  } as Record<number, ContractAddressMap>;