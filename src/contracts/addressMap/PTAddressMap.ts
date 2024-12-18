import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
    slisBNB = "slisBNB",
}

export const PTAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: '0x36955F4cDC4E77c41038024A072cD37832F2Ea87',
    }
  } as Record<number, ContractAddressMap>;