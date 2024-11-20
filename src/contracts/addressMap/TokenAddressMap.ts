import { ChainId } from "@/contracts/chains";

export enum TokenSymobl {
    Token0 = "Token0",
    Token1 = "Token1",
    Token2 = "Token2",
  }

export type ContractAddressMap = Record<string, `0x${string}`>;

export const tokenAddressMap = {
  [ChainId.BLAST_SEPOLIA]: {

  },
  [ChainId.BSC_TESTNET]: {
    [TokenSymobl.Token0]: "0x1489C44Aa6A0f48E02508d56FD289b71B2F0beaF",
    [TokenSymobl.Token1]: "0x5E66CCe71D453D8d172BF3001E6280dA5e55B008",
    [TokenSymobl.Token2]: "0x0821A93786F76495C00b26c453d26d931BeB5e7A",
  }
} as Record<number, ContractAddressMap>;