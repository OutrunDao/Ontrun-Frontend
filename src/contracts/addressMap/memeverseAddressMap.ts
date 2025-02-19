import { ChainId } from "@/contracts/chains";

type MemeverseAddressMap = { [chainId: number]: string };
export enum ContractName {
  memeverseRegistrationCenter = "memeverseRegistrationCenter",
  endPoint = "endPoint",
  MemeverseRegistrar = "MemeverseRegistrar",
  UETHMemeverseLauncher = "UETHMemeverseLauncher",
}
export type ContractAddressMap = Record<string, `0x${string}`>;

export const memeverseAddressMap = {
  [ChainId.BLAST_SEPOLIA]: {
  },
  [ChainId.BSC_TESTNET]: {
    [ContractName.memeverseRegistrationCenter]: "0xE4B2b1181dFF13fec861CE0678723BBf9F0Cb191",
    [ContractName.endPoint]: "0x6EDCE65403992e310A62460808c4b910D972f10f",
  }
} as Record<number, ContractAddressMap>;

export const GmemeverseAddressMap = {
  "MemeverseRegistrar": "0xf327f06f8D6FC07549FC4a23fd5DF5738fF0C7dC",
}
