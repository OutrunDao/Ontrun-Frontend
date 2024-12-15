import { ChainId } from "@/contracts/chains";

type MemeverseAddressMap = { [chainId: number]: string };
export enum ContractName {
  memeverseRegistrationCenter = "memeverseRegistrationCenter",
  endPoint = "endPoint",
}
export type ContractAddressMap = Record<string, `0x${string}`>;

export const memeverseAddressMap = {
  [ChainId.BLAST_SEPOLIA]: {
  },
  [ChainId.BSC_TESTNET]: {
    [ContractName.memeverseRegistrationCenter]: "0x785f2a12107307B4846b4689998Cb5A0e262A0f8",
    [ContractName.endPoint]: "0x6EDCE65403992e310A62460808c4b910D972f10f",
  }
} as Record<number, ContractAddressMap>;
