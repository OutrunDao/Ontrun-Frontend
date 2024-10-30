import { ContractAddressMap } from "./addressMap";
import { ChainId } from "../chains";

export enum ContractName {
    UBNB = "UBNB",
}

export const uAddressMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.UBNB]: "0xF7a6ff48b866b5ee0245AB0022F8AAab19F8F18F",
    }
  } as Record<number, ContractAddressMap>;
  
  export const initCodeHashMap = {
    [ChainId.BLAST_SEPOLIA]: "0x9d7b24376800c0a5fb253d12673d2021f71732f524fe808d89000739fc93fce8",
  } as Record<number, `0x${string}`>;