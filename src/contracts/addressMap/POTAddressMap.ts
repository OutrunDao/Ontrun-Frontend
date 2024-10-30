import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const POTAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0x0F116f17F5af2e35E11317aF7f56eC9c9BBE4440',
    }
  } as Record<number, ContractAddressMap>;