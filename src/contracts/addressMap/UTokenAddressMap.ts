import { ContractAddressMap } from "./addressMap";
import { ChainId } from "../chains";

export enum ContractName {
    UBNB = "UBNB",
}

export const uAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.UBNB]: "0x294285577306bc14224510966DFb81002A5a3C6E",
    }
  } as Record<number, ContractAddressMap>;
  
  export const initCodeHashMap = {
    [ChainId.BLAST_SEPOLIA]: "0x9d7b24376800c0a5fb253d12673d2021f71732f524fe808d89000739fc93fce8",
  } as Record<number, `0x${string}`>;