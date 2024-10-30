import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const YTAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0xab698dBD72a5a553CfBeC500163256478ba23dDB',
    }
  } as Record<number, ContractAddressMap>;