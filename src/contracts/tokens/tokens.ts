import { Token } from "@/packages/core/entities/token";
import { computePairAddress } from "@/packages/sdk";
import { addressMap } from "../addressMap/addressMap";
import { ChainETHSymbol, ChainId } from "../chains";
import { tokenAddressMap } from "../addressMap/TokenAddressMap";
import { Ether } from "@/packages/core";

export const WETH9: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    "0x4200000000000000000000000000000000000023",
    18,
    "WETH",
    "Wrapped Ether",
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, "0x4300000000000000000000000000000000000004", 18, "WETH", "Wrapped Ether"),
};

/**
 * Blast usdt like coin: usdb
 */
export const USDB: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    "0x4200000000000000000000000000000000000022",
    18,
    "USDB",
    "USDB",
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, "0x4200000000000000000000000000000000000022", 18, "USDB", "USDB"),
};

export const tBNB: { [chainId: number]: Token } = {

  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    addressMap[ChainId.BSC_TESTNET].WBNB,
    18,
    "tBNB",
    "Test BNB",
  )
}

export const ORETH: { [chainId: number]: Token } = {
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    addressMap[ChainId.BSC_TESTNET].WBNB,
    18,
    "wBNB",
    "Wrapped BNB",
  )
}

export const Token0: { [chainId: number]: Token } = {
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    tokenAddressMap[ChainId.BSC_TESTNET].Token0,
    18,
    "Token0",
    "Token0",
  )
};

export const Token1: { [chainId: number]: Token } = {
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    tokenAddressMap[ChainId.BSC_TESTNET].Token1,
    18,
    "Token1",
    "Token1",
  )
};

export const Token2: { [chainId: number]: Token } = {
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    tokenAddressMap[ChainId.BSC_TESTNET].Token2,
    18,
    "Token2",
    "Token2",
  )
}

export const USDT: { [chainId: number]: Token } = {
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    tokenAddressMap[ChainId.BSC_TESTNET].USDT,
    18,
    "USDT",
    "USDT",
  )
}

export function getTokenSymbol(token: Token|Ether, chainId: number): string {
  if(token.isNative){
    return ChainETHSymbol[chainId];
  } else {
    return token.symbol ?? "";
  }
}
