import { ChainId } from "@/contracts/chains";

export enum TokenSymobl {
    Token0 = "Token0",
    Token1 = "Token1",
    Token2 = "Token2",
    USDT = "USDT",
  }

export type ContractAddressMap = Record<string, `0x${string}`>;

export const tokenAddressMap = {
  [ChainId.BLAST_SEPOLIA]: {

  },
  [ChainId.BSC_TESTNET]: {
    // [TokenSymobl.Token0]: "0x1489C44Aa6A0f48E02508d56FD289b71B2F0beaF",
    // [TokenSymobl.Token1]: "0x5E66CCe71D453D8d172BF3001E6280dA5e55B008",
    // [TokenSymobl.Token2]: "0x0821A93786F76495C00b26c453d26d931BeB5e7A",

    [TokenSymobl.Token0]: "0x247A66Aa75EDA7ab73d9c2fBFC74530933946533",
    [TokenSymobl.Token1]: "0xC4997322C73405f33a89228AEF5c9008C0DDa517",
    [TokenSymobl.Token2]: "0x3212bD0fA3aeBd0001cd2616Ff7a161E7C9cfB0E",
    [TokenSymobl.USDT]: "0xff5f3E0a160392fBF4fFfD9Eb6F629c121E92d9e",
  }
} as Record<number, ContractAddressMap>;