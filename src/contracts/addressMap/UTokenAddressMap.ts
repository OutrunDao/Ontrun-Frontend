import { ContractAddressMap } from "./addressMap";
import { ChainId } from "../chains";

export enum ContractName {
    UBNB = "UBNB",
}

export const uAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.UBNB]: "0x36955F4cDC4E77c41038024A072cD37832F2Ea87",
    }
  } as Record<number, ContractAddressMap>;
  
  export const initCodeHashMap = {
    [ChainId.BLAST_SEPOLIA]: "0x9d7b24376800c0a5fb253d12673d2021f71732f524fe808d89000739fc93fce8",
  } as Record<number, `0x${string}`>;