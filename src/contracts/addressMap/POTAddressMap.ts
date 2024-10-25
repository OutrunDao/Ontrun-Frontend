import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const POTAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0x7F5b6C208D2F426F17caae9db9331B9CB7a4a0CF',
    }
  } as Record<number, ContractAddressMap>;